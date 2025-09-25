// app.js - Enhanced with gamified poll, social sharing, and new content sections
class DrugDataStory {
  constructor() {
    this.currentStep = 0;
    this.pollTriggered = false;
    this.userPrediction = null;
    this.lastFocusedElement = null;
    this.POLL_CORRECT_ANSWER = 'treatment';
    this.init();
  }

  init() {
    this.cacheDOM();
    this.setupEventListeners();
    this.initNewsTicker();
    this.initScrollytelling();
    this.initPoll();
    this.initSocialSharing();
    this.initCopyBibTeX();
    this.initDonationBanner();
    this.checkExistingPollResponse();
  }

  cacheDOM() {
    this.dom = {
      body: document.body,
      article: document.querySelector('#story'),
      steps: document.querySelectorAll('.step'),
      visuals: document.querySelectorAll('.story-image'),
      newsTicker: document.querySelector('#news-ticker'),
      newsTickerContainer: document.querySelector('#news-ticker-container'),
      progressEl: document.querySelector('#scroll-progress'),
      pollModal: document.querySelector('#poll-modal'),
      pollOverlay: document.querySelector('#poll-modal-overlay'),
      closePollBtn: document.querySelector('#close-poll-btn'),
      pollSteps: document.querySelectorAll('.poll-step'),
      pollPredictForm: document.querySelector('#poll-predict-form'),
      pollVoteForm: document.querySelector('#reader-poll-form'),
      pollFieldset: document.querySelector('#poll-fieldset'),
      pollResults: document.querySelector('#poll-results'),
      pollResultsInline: document.querySelector('#poll-results-inline'),
      priorVoteText: document.querySelector('#prior-vote-text'),
      copyBibTeXBtn: document.querySelector('#copy-bibtex-btn'),
      bibtexContent: document.querySelector('#bibtex-content'),
      donationBanner: document.querySelector('#donation-banner'),
      donateBtn: document.querySelector('#donate-btn'),
      headerDonateBtn: document.querySelector('#header-donate-btn'),
      dismissBannerBtn: document.querySelector('#dismiss-banner'),
      footer: document.querySelector('#site-footer'),
      remindLaterBtn: document.querySelector('#remind-later-btn'),
      shareIconsContainer: document.querySelector('#share-icons-container'),
      projectShareContainer: document.querySelector('#project-share-buttons')
    };
  }

  setupEventListeners() {
    window.addEventListener('scroll', this.throttle(() => this.handleScroll(), 10));
    document.addEventListener('keydown', (e) => this.handleKeydown(e));
    this.dom.newsTickerContainer?.addEventListener('mouseenter', () => this.dom.newsTicker.classList.add('paused'));
    this.dom.newsTickerContainer?.addEventListener('mouseleave', () => this.dom.newsTicker.classList.remove('paused'));
    this.dom.closePollBtn?.addEventListener('click', () => this.closePollModal());
    this.dom.pollOverlay?.addEventListener('click', () => this.closePollModal());
    this.dom.dismissBannerBtn?.addEventListener('click', () => this.dismissDonationBanner());
    this.dom.donateBtn?.addEventListener('click', () => this.handleDonation());
    this.dom.headerDonateBtn?.addEventListener('click', () => this.handleDonation());
    this.dom.remindLaterBtn?.addEventListener('click', () => this.remindLater());
  }

  handleKeydown(e) { if (e.key === 'Escape' && !this.dom.pollModal.classList.contains('hidden')) this.closePollModal(); }
  throttle(func, limit) { let inThrottle; return (...args) => { if (!inThrottle) { func.apply(this, args); inThrottle = true; setTimeout(() => inThrottle = false, limit); } }; }

  async initNewsTicker() {
    if (!this.dom.newsTicker) return;
    const items = [
      'SRI LANKA: Drug-related arrests surpass 160,000 in 2023, a new record high.', 'POLICY: Debates continue on prioritizing enforcement vs. public health and treatment.',
      'TRENDS: Methamphetamine seizures see a sharp rise, indicating shifting drug markets.', 'HEALTH: Only a fraction of those arrested receive addiction treatment, highlighting a critical gap.',
      'NATIONWIDE: Western Province remains the epicenter of drug arrests and seizures.'
    ];
    this.dom.newsTicker.innerHTML = [...items, ...items].map(item => `<span class="ticker-item">${item}</span><span class="ticker-item" aria-hidden="true">•</span>`).join('');
  }
  
  initScrollytelling() {
    if (this.dom.steps.length === 0) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) this.updateActiveStep(parseInt(entry.target.dataset.step, 10)); });
    }, { root: null, rootMargin: '0px 0px -40% 0px', threshold: 0.5 });
    this.dom.steps.forEach(step => observer.observe(step));
    this.updateActiveStep(0);
    this.initFooterObserver();
  }

  initFooterObserver() {
    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.pollTriggered && !this.hasPollResponse() && !this.shouldRemindLater()) {
          this.openPollModal(); this.pollTriggered = true;
        }
      });
    }, { threshold: 0.1 });
    if (this.dom.footer) footerObserver.observe(this.dom.footer);
  }

  handleScroll() {
    if (!this.dom.progressEl || !this.dom.article) return;
    const { top, height } = this.dom.article.getBoundingClientRect();
    const scrollableHeight = height - window.innerHeight;
    const progress = Math.min(100, Math.max(0, scrollableHeight <= 0 ? (top > 0 ? 0 : 100) : (-top / scrollableHeight) * 100));
    this.dom.progressEl.value = progress;
  }

  updateActiveStep(stepIndex) {
    if (isNaN(stepIndex)) return;
    this.currentStep = stepIndex;
    this.dom.steps.forEach(step => step.classList.toggle('active', parseInt(step.dataset.step) === stepIndex));
    this.dom.visuals.forEach(vis => vis.classList.toggle('active', parseInt(vis.dataset.visual) === stepIndex));
    this.updateShareIcons(stepIndex);
  }

  initPoll() {
    this.dom.pollPredictForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.userPrediction = new FormData(this.dom.pollPredictForm).get('poll-predict');
      if (this.userPrediction) this.setPollStep(1); // Move to voting step
    });
    this.dom.pollVoteForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const selectedValue = new FormData(this.dom.pollVoteForm).get('poll-priority');
      if (selectedValue) {
        this.savePollResponse(selectedValue);
        this.showPollResults(selectedValue, this.userPrediction);
        this.setPollStep(2); // Move to results step
        setTimeout(() => this.closePollModal(), 4000);
      }
    });
  }

  setPollStep(stepIndex) {
    this.dom.pollSteps.forEach((step, index) => step.classList.toggle('active', index === stepIndex));
  }
  
  openPollModal() {
    this.lastFocusedElement = document.activeElement;
    this.dom.pollModal.classList.remove('hidden');
    this.dom.pollOverlay.classList.remove('hidden');
    this.dom.body.classList.add('modal-open');
    this.setPollStep(0); // Start at prediction step
    this.setupFocusTrap();
  }

  closePollModal() {
    this.dom.pollModal.classList.add('hidden');
    this.dom.pollOverlay.classList.add('hidden');
    this.dom.body.classList.remove('modal-open');
    document.removeEventListener('keydown', this.focusTrapHandler);
    this.lastFocusedElement?.focus();
  }

  checkExistingPollResponse() { const response = this.getPollResponse(); if (response) { this.showInlinePollResults(response); this.pollTriggered = true; } }
  hasPollResponse() { return !!localStorage.getItem('drugPollResponse'); }
  getPollResponse() { return localStorage.getItem('drugPollResponse'); }
  shouldRemindLater() { const remindLater = localStorage.getItem('pollRemindLater'); return remindLater && new Date() < new Date(remindLater); }
  remindLater() { const remindDate = new Date(); remindDate.setDate(remindDate.getDate() + 7); localStorage.setItem('pollRemindLater', remindDate.toISOString()); this.closePollModal(); }
  savePollResponse(value) { try { localStorage.setItem('drugPollResponse', value); } catch (e) { console.warn('Could not save poll response.'); } }

  showPollResults(vote, prediction) {
    const labels = { enforcement: 'Law Enforcement', treatment: 'Treatment Services', prevention: 'Prevention Programs' };
    let resultHTML = `<p>You voted for: <strong>${labels[vote]}</strong>.</p>`;
    if (prediction === this.POLL_CORRECT_ANSWER) {
      resultHTML += `<p style="color:var(--color-success)"><strong>You correctly predicted!</strong> Most readers also believe <strong>${labels[this.POLL_CORRECT_ANSWER]}</strong> should be the priority.</p>`;
    } else {
      resultHTML += `<p style="color:var(--color-warning)">Your prediction was ${labels[prediction]}, but most readers believe <strong>${labels[this.POLL_CORRECT_ANSWER]}</strong> should be the priority.</p>`;
    }
    this.dom.pollResults.innerHTML = resultHTML;
  }
  showInlinePollResults(value) { const labels = { enforcement: 'Law Enforcement', treatment: 'Treatment Services', prevention: 'Prevention Programs' }; this.dom.priorVoteText.textContent = `You previously voted for: ${labels[value] || value}`; this.dom.pollResultsInline.classList.remove('hidden'); }

  initDonationBanner() { if (this.isBannerDismissed()) this.dom.donationBanner?.classList.add('hidden'); }
  dismissDonationBanner() { this.dom.donationBanner.classList.add('hidden'); const expiry = new Date(); expiry.setDate(expiry.getDate() + 30); try { localStorage.setItem('donationBannerDismissed', expiry.toISOString()); } catch (e) { console.warn('Could not save banner dismissal'); } }
  isBannerDismissed() { const dismissedUntil = localStorage.getItem('donationBannerDismissed'); return dismissedUntil && new Date() < new Date(dismissedUntil); }
  handleDonation() { alert('Thank you for your support! Please find donation details in the footer of the page.'); }

  initSocialSharing() {
    const pageUrl = window.location.href.split('#')[0];
    const pageTitle = "The Shadow War: Unpacking Sri Lanka's Drug Crisis";
    const services = {
        twitter: { icon: '<svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>', url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(pageTitle)}` },
        linkedin: { icon: '<svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>', url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(pageUrl)}&title=${encodeURIComponent(pageTitle)}` }
    };
    // Project-level sharing
    this.dom.projectShareContainer.innerHTML = Object.values(services).map(s => `<a href="${s.url}" target="_blank" rel="noopener noreferrer" class="share-btn">${s.icon}</a>`).join('');
    // Per-image sharing
    this.dom.shareIconsContainer.innerHTML = Object.keys(services).map(key => `<button class="share-btn" data-service="${key}" aria-label="Share on ${key}">${services[key].icon}</button>`).join('');
    this.dom.shareIconsContainer.addEventListener('click', (e) => {
      const button = e.target.closest('.share-btn');
      if (!button) return;
      const service = button.dataset.service;
      const stepTitle = this.dom.steps[this.currentStep].querySelector('h2').textContent;
      const shareText = `Check out this visual on "${stepTitle}" from The Shadow War:`;
      const shareUrl = `${pageUrl}#step-${this.currentStep}`;
      let url;
      if (service === 'twitter') url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
      if (service === 'linkedin') url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(pageTitle)}&summary=${encodeURIComponent(shareText)}`;
      if (url) window.open(url, '_blank', 'width=600,height=400');
    });
  }
  updateShareIcons(stepIndex) { /* This function can be used to dynamically change icons if needed, but current setup is static. */ }
  
  initCopyBibTeX() { this.dom.copyBibTeXBtn?.addEventListener('click', async () => { try { await navigator.clipboard.writeText(this.dom.bibtexContent.textContent.trim()); const originalText = this.dom.copyBibTeXBtn.textContent; this.dom.copyBibTeXBtn.textContent = 'Copied!'; this.dom.copyBibTeXBtn.disabled = true; setTimeout(() => { this.dom.copyBibTeXBtn.textContent = originalText; this.dom.copyBibTeXBtn.disabled = false; }, 2000); } catch (err) { console.error('Failed to copy text: ', err); } }); }
  setupFocusTrap() { const focusable = this.dom.pollModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'); const first = focusable[0]; const last = focusable[focusable.length - 1]; first?.focus(); this.focusTrapHandler = (e) => { if (e.key !== 'Tab') return; if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); } else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); } }; document.addEventListener('keydown', this.focusTrapHandler); }
}
document.addEventListener('DOMContentLoaded', () => new DrugDataStory());