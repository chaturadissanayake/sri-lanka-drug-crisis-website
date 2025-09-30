/* =========================================================
   THE SHADOW WAR — V6.1 APP.JS (ENHANCED REDESIGN)
   - Fixed floating point animation bug
   - Added URL hash handling on initial load
   - Improved accessibility (screen reader announcements, ticker focus)
   - Enhanced UI feedback and interaction logic
   ========================================================= */

(function() {
  "use strict";

  /* ---------- 1. ICONS (Feather Icons SVG) ---------- */
  const ICONS = {
    sun: `<svg class="icon sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
    moon: `<svg class="icon moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
    contrast: `<svg class="icon contrast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 18a6 6 0 0 0 0-12v12z"></path></svg>`,
    x: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
    x_social: `<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>`,
    linkedin: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>`,
    instagram: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`,
    copy: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`,
    check: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
    plus: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
    comment: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`,
    download: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`,
    share: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>`,
    arrests: `<svg class="icon" stroke-width="1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M14.622 3.393l-1.98 1.98m-3.96 0L6.702 3.393m9.9 0a7.5 7.5 0 00-9.9 0m9.9 0l1.98 1.98m-13.86 0L4.722 3.393m0 0a7.5 7.5 0 009.9 0M4.722 5.373a7.5 7.5 0 007.5 9.252 7.5 7.5 0 007.5-9.252" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3.75 12h.75m15 0h.75M9 14.25c0 .966.784 1.75 1.75 1.75h2.5A1.75 1.75 0 0015 14.25v-2.5c0-.966-.784-1.75-1.75-1.75h-2.5A1.75 1.75 0 009 11.75v2.5zM12 21v-3.75" stroke-linecap="round" stroke-linejoin="round"></path></svg>`,
    meth: `<svg class="icon" stroke-width="1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M15.58 15.21l-3.93 3.93a.92.92 0 01-1.3 0l-3.93-3.93a.92.92 0 010-1.3l3.93-3.93a.92.92 0 011.3 0l3.93 3.93c.36.36.36.94 0 1.3zM18 6l-2.5 2.5M18 6h-3.5M18 6V2.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`,
    geo: `<svg class="icon" stroke-width="1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 10.5c0 4.97-9 13.5-9 13.5s-9-8.53-9-13.5C3 5.03 7.03 1 12 1s9 4.03 9 9.5z" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 13a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
  };

  /* ---------- 2. UTILITIES ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  
  const showToast = (message, type = 'info') => {
      const announcer = $('.sr-announcer');
      if (announcer) announcer.textContent = message;

      const toast = document.createElement('div');
      toast.className = `toast-notification ${type}`;
      toast.textContent = message;
      document.body.appendChild(toast);
      
      setTimeout(() => {
          toast.classList.add('show');
          setTimeout(() => {
              toast.classList.remove('show');
              setTimeout(() => document.body.removeChild(toast), 300);
          }, 3500); // Increased duration
      }, 10);
  };

  // FIX: Handles floating point numbers correctly
  const animateValue = (element, start, end, duration, formatter) => {
    let startTime = null;
    const step = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const currentValue = progress * (end - start) + start;
        element.textContent = formatter(currentValue);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
  };

  /* ---------- 3. CORE MODULES ---------- */
  
  const App = {
    currentStep: 0,
    totalSteps: 0,
    
    init() {
      this.totalSteps = $$('.step').length;
      this.initComponents();
      this.initScrollytelling();
      this.initInteractions();
      this.initAnimations();
      this.initLightbox();
      this.preventImageRightClick();
      this.initKeyboardNavigation();
      this.initBackToTopButton();
      this.handleInitialHash(); // Handle deep links on load
    },

    initComponents() {
      const announcer = $('.sr-announcer');

      // --- Theme Toggle ---
      const themeBtn = $('#theme-toggle');
      const themes = ['dark', 'light', 'high-contrast'];
      if (themeBtn) {
        themeBtn.innerHTML = ICONS.moon + ICONS.sun + ICONS.contrast;
        let currentThemeIndex = themes.indexOf(localStorage.getItem('theme') || 'dark');
        if (currentThemeIndex === -1) currentThemeIndex = 0;
        document.documentElement.setAttribute('data-theme', themes[currentThemeIndex]);

        themeBtn.addEventListener('click', () => {
          currentThemeIndex = (currentThemeIndex + 1) % themes.length;
          const newTheme = themes[currentThemeIndex];
          document.documentElement.setAttribute('data-theme', newTheme);
          localStorage.setItem('theme', newTheme);
          if (announcer) announcer.textContent = `Theme changed to ${newTheme.replace('-', ' ')}.`;
        });
      }
      
      // --- Scroll Progress Bar ---
      const bar = $('#scroll-progress-bar');
      if (bar) {
        window.addEventListener('scroll', () => {
          const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
          bar.style.width = `${progress}%`;
        }, { passive: true });
      }

      // --- News Ticker ---
      const ticker = $('#news-ticker');
      if (ticker) {
        const items = [
          'SRI LANKA: Drug-related arrests surpassed 160,000 in 2023 — a record high.',
          'POLICY: Debate continues over enforcement vs. treatment-first approaches.',
          'TRENDS: Methamphetamine seizures rising — shifting drug markets.',
          'HEALTH: Only a fraction entering treatment — a widening care gap.',
          'GEOGRAPHY: Western Province remains the epicenter of arrests and seizures.'
        ];
        ticker.innerHTML = [...items, ...items].map(t => `<span class="ticker-item">${t}</span>`).join('');
        const container = $('#news-ticker-container');
        // A11y: Pause on focus as well as hover
        container?.addEventListener('mouseenter', () => ticker.classList.add('paused'));
        container?.addEventListener('mouseleave', () => ticker.classList.remove('paused'));
        container?.addEventListener('focusin', () => ticker.classList.add('paused'));
        container?.addEventListener('focusout', () => ticker.classList.remove('paused'));
      }
      
      // --- Populate Icons ---
      $('.accordion-icon')?.insertAdjacentHTML('beforeend', ICONS.plus);
      $('#close-shortcuts')?.insertAdjacentHTML('beforeend', ICONS.x);
      $('#close-lightbox')?.insertAdjacentHTML('beforeend', ICONS.x);
      $$('.copy-btn').forEach(btn => {
        btn.innerHTML += `<span class="copy-icon">${ICONS.copy}</span><span class="tooltip-text">Copied!</span>`;
      });
      $('#icon-arrests')?.insertAdjacentHTML('beforeend', ICONS.arrests);
      $('#icon-meth')?.insertAdjacentHTML('beforeend', ICONS.meth);
      $('#icon-geo')?.insertAdjacentHTML('beforeend', ICONS.geo);
      $$('.feedback-icon').forEach(el => el.innerHTML = ICONS.comment);
      $$('.download-icon').forEach(el => el.innerHTML = ICONS.download);
      $$('.share-icon').forEach(el => el.innerHTML = ICONS.share);

      // --- Last Updated Stamp ---
      const lastUpdatedFooter = $('#last-updated-footer');
      if (lastUpdatedFooter) {
        lastUpdatedFooter.textContent = `Last updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`;
      }
    },

    initScrollytelling() {
      const steps = $$('.step');
      const navContainer = $('#scrolly-nav');
      const footerNavContainer = $('#footer-nav');

      if (steps.length === 0) return;
      
      // 1. Build side & footer navigation
      let navListHTML = '', footerNavHTML = '';
      steps.forEach(step => {
        const id = step.id;
        const title = step.dataset.title || `Section`;
        navListHTML += `
          <li class="scrolly-nav-item" data-step-id="${id}">
            <a href="#${id}" aria-label="Go to ${title}"></a>
            <span class="nav-label">${title}</span>
          </li>`;
        footerNavHTML += `<li><a href="#${id}">${title}</a></li>`;
      });
      if(navContainer) navContainer.innerHTML = `<ul>${navListHTML}</ul>`;
      if(footerNavContainer) footerNavContainer.innerHTML = footerNavHTML;

      // 2. Observer for activating charts and nav items
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const id = entry.target.id;
          const navItem = $(`[data-step-id="${id}"]`, navContainer);
          const footerNavItem = $(`a[href="#${id}"]`, footerNavContainer);

          if (entry.isIntersecting) {
            this.currentStep = parseInt(entry.target.dataset.step);
            
            $$('.step').forEach(s => s.classList.remove('active'));
            entry.target.classList.add('active');
            
            // Activate corresponding visual element
            $(`[data-visual="${entry.target.dataset.step}"]`)?.classList.add('is-visible');
            
            // Update side and footer nav active states
            $$('.scrolly-nav-item', navContainer).forEach(item => {
              item.classList.remove('active');
              $('a', item).removeAttribute('aria-current');
            });
            $$('a', footerNavContainer).forEach(a => a.classList.remove('active'));

            navItem?.classList.add('active');
            $('a', navItem)?.setAttribute('aria-current', 'true');
            footerNavItem?.classList.add('active');
            
            // Sync URL with active section without polluting history
            history.replaceState(null, '', `#${id}`);
          } else {
            $(`[data-visual="${entry.target.dataset.step}"]`)?.classList.remove('is-visible');
          }
        });
      }, { rootMargin: "-50% 0px -50% 0px", threshold: 0 });

      steps.forEach(step => observer.observe(step));
    },

    initInteractions() {
      const announcer = $('.sr-announcer');
      // --- Citation Tabs ---
      $('.citation-tabs')?.addEventListener('click', (e) => {
        const clickedTab = e.target.closest('.tab-button');
        if (!clickedTab) return;
        e.preventDefault();
        $$('.tab-button', e.currentTarget).forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });
        $$('.tab-panel').forEach(panel => panel.classList.remove('active'));
        clickedTab.classList.add('active');
        clickedTab.setAttribute('aria-selected', 'true');
        $(`#${clickedTab.getAttribute('aria-controls')}`)?.classList.add('active');
      });

      // --- Copy-to-Clipboard ---
      $$('.copy-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          const target = $(btn.dataset.clipboardTarget);
          if (!target) return;
          try {
            await navigator.clipboard.writeText(target.textContent.trim());
            btn.classList.add('show-tooltip');
            if (announcer) announcer.textContent = 'Copied to clipboard.';
            const icon = $('.copy-icon', btn);
            if (icon) {
              const original = icon.innerHTML;
              icon.innerHTML = ICONS.check;
              setTimeout(() => { icon.innerHTML = original; }, 1500);
            }
            setTimeout(() => btn.classList.remove('show-tooltip'), 1200);
          } catch (err) { 
            console.error('Failed to copy:', err);
            if (announcer) announcer.textContent = 'Failed to copy.';
          }
        });
      });

      // --- Data Download ---
      $$('.data-download-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const dataset = btn.dataset.download;
          this.downloadDataset(dataset);
        });
      });
      
      // --- Share Section ---
      $$('.share-section-btn').forEach(btn => {
          btn.addEventListener('click', async () => {
              const section = btn.closest('.step');
              if (!section) return;
              const shareUrl = new URL(`#${section.id}`, window.location.href).href;
              const shareTitle = section.dataset.title || document.title;
              const shareData = {
                  title: `The Shadow War: ${shareTitle}`,
                  text: `Check out the "${shareTitle}" section of this data story on Sri Lanka's drug crisis.`,
                  url: shareUrl,
              };

              if (navigator.share) {
                  try {
                      await navigator.share(shareData);
                  } catch (err) {
                      console.error("Share API failed:", err);
                  }
              } else {
                  try {
                      await navigator.clipboard.writeText(shareUrl);
                      showToast('Section link copied to clipboard!', 'success');
                  } catch (err) {
                      showToast('Failed to copy link.', 'error');
                  }
              }
          });
      });

      // --- Share & Social Icons ---
      const shareContainer = $('#project-share-buttons');
      if (shareContainer) {
        const shareUrl = "https://chaturadissanayake.github.io/the-shadow-war/";
        const shareTitle = encodeURIComponent("The Shadow War: Sri Lanka's Drug Crisis");
        shareContainer.innerHTML = `
          <a href="https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}" target="_blank" rel="noopener" class="share-btn" aria-label="Share on X">${ICONS.x_social}</a>
          <a href="https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}" target="_blank" rel="noopener" class="share-btn" aria-label="Share on LinkedIn">${ICONS.linkedin}</a>
        `;
      }

      if ($('#social-links-footer')) {
        $('#social-links-footer').innerHTML = `
          <a href="https://www.instagram.com/chaturadissanayake/" target="_blank" rel="noopener" aria-label="Follow on Instagram">${ICONS.instagram}</a>
          <a href="https://x.com/atakatus" target="_blank" rel="noopener" aria-label="Follow on X">${ICONS.x_social}</a>
          <a href="https://www.linkedin.com/in/chaturadissanayake/" target="_blank" rel="noopener" aria-label="Follow on LinkedIn">${ICONS.linkedin}</a>
        `;
      }
      
      // --- Community Feedback Toggle ---
      $$('.feedback-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const panel = $(`#${btn.getAttribute('aria-controls')}`);
            if (!panel) return;
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', !isExpanded);
            panel.hidden = isExpanded;
        });
      });

      // --- Keyboard Shortcuts Modal ---
      const shortcutsModal = $('#shortcuts-modal');
      if (shortcutsModal) {
        const openShortcutsModal = () => this.openModal(shortcutsModal);
        const closeShortcutsModal = () => this.closeModal(shortcutsModal);
        $('#close-shortcuts')?.addEventListener('click', closeShortcutsModal);
        shortcutsModal.addEventListener('click', (e) => { if (e.target === shortcutsModal) closeShortcutsModal(); });
        window.addEventListener('keydown', (e) => {
          if (e.key === '?' && e.shiftKey) { e.preventDefault(); openShortcutsModal(); }
          if (e.key === 't' && document.activeElement.tagName !== 'INPUT') $('#theme-toggle')?.click();
        });
      }
    },
    
    initAnimations() {
      // --- Appear on Scroll ---
      const elements = $$('.animate-on-scroll');
      if (elements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1 });
        elements.forEach(el => observer.observe(el));
      }

      // --- Animate Hero Stats ---
      const heroStats = $('.hero-stats');
      if (heroStats) {
          const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                  if (entry.isIntersecting) {
                      const statArrests = $('#stat-arrests');
                      const statTreatment = $('#stat-treatment');
                      const statRatio = $('#stat-ratio');
                      
                      if (statArrests && !statArrests.dataset.animated) {
                          statArrests.dataset.animated = 'true';
                          animateValue(statArrests, 0, 160000, 2000, val => val.toLocaleString(undefined, {maximumFractionDigits: 0}));
                      }
                      if (statTreatment && !statTreatment.dataset.animated) {
                          statTreatment.dataset.animated = 'true';
                          animateValue(statTreatment, 0, 2600, 1800, val => val.toLocaleString(undefined, {maximumFractionDigits: 0}));
                      }
                      if (statRatio && !statRatio.dataset.animated) {
                          statRatio.dataset.animated = 'true';
                          animateValue(statRatio, 0, 1.6, 1900, val => `${val.toFixed(1)}%`);
                      }
                      observer.unobserve(entry.target);
                  }
              });
          }, { threshold: 0.5 });
          observer.observe(heroStats);
      }
    },

    initLightbox() {
        const lightbox = $('#image-lightbox');
        if (!lightbox) return;
        const closeBtn = $('#close-lightbox');

        $$('.enlarge-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const figure = btn.closest('figure');
                const image = $('.story-image', figure);
                const caption = $('figcaption', figure);
                if (!image || !caption) return;
                
                // Use the highest resolution available (2700px version)
                const highResSrc = image.src.replace(/(\d+)\.(png|jpg|webp)$/, '2700.$2');
                $('.lightbox-image', lightbox).src = highResSrc;
                $('.lightbox-image', lightbox).alt = image.alt;
                $('.lightbox-caption', lightbox).textContent = caption.textContent;
                this.openModal(lightbox);
            });
        });

        const closeLightbox = () => this.closeModal(lightbox);
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    },
    
    openModal(modal) {
        this.lastFocusedElement = document.activeElement;
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        const focusableElements = $$('a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])', modal)
            .filter(el => !el.hasAttribute('disabled'));
        this.firstFocusable = focusableElements[0];
        this.lastFocusable = focusableElements[focusableElements.length - 1];
        
        this.firstFocusable?.focus();
        
        // FIX: Remove redundant event listener binding
        modal._focusTrapHandler = this.trapFocus.bind(this);
        modal.addEventListener('keydown', modal._focusTrapHandler);
    },

    closeModal(modal) {
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        this.lastFocusedElement?.focus();
        if (modal._focusTrapHandler) {
            modal.removeEventListener('keydown', modal._focusTrapHandler);
        }
    },
    
    trapFocus(e) {
        if (e.key !== 'Tab') return;
        if (e.shiftKey) { // Shift + Tab
            if (document.activeElement === this.firstFocusable) {
                this.lastFocusable.focus();
                e.preventDefault();
            }
        } else { // Tab
            if (document.activeElement === this.lastFocusable) {
                this.firstFocusable.focus();
                e.preventDefault();
            }
        }
    },

    preventImageRightClick() {
        $$('.story-image, .lightbox-image').forEach(img => img.addEventListener('contextmenu', e => e.preventDefault()));
    },
    
    initKeyboardNavigation() {
      window.addEventListener('keydown', (e) => {
        const isModalOpen = $('#shortcuts-modal')?.getAttribute('aria-hidden') === 'false' || $('#image-lightbox')?.getAttribute('aria-hidden') === 'false';
        if (isModalOpen || document.activeElement.tagName === 'INPUT' || e.metaKey || e.ctrlKey) return;
        
        switch(e.key) {
          case 'j': case 'ArrowDown':
            e.preventDefault(); this.navigateToStep(this.currentStep + 1); break;
          case 'k': case 'ArrowUp':
            e.preventDefault(); this.navigateToStep(this.currentStep - 1); break;
          case 'Escape':
            if ($('#shortcuts-modal')?.getAttribute('aria-hidden') === 'false') this.closeModal($('#shortcuts-modal'));
            else if ($('#image-lightbox')?.getAttribute('aria-hidden') === 'false') this.closeModal($('#image-lightbox'));
            break;
        }
      });
    },
    
    navigateToStep(stepIndex) {
      if (stepIndex < 0 || stepIndex >= this.totalSteps) return;
      $$('.step')[stepIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    },
    
    initBackToTopButton() {
        const btn = $('#back-to-top-btn');
        if (!btn) return;
        window.addEventListener('scroll', () => {
            if (window.scrollY > window.innerHeight * 0.5) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        }, { passive: true });
        
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    },

    handleInitialHash() {
        const hash = window.location.hash;
        if (hash) {
            const targetStep = $(hash);
            if (targetStep && targetStep.classList.contains('step')) {
                setTimeout(() => {
                    targetStep.scrollIntoView({ behavior: 'auto', block: 'center' });
                }, 100);
            }
        }
    },
    
    downloadDataset(datasetName) {
      let data, filename, mimeType = 'text/csv';
      
      const datasets = {
          'arrests-vs-treatment': "Year,Arrests,Treatment\n2018,45000,2200\n2019,52000,2400\n2020,68000,2100\n2021,89000,2300\n2022,125000,2500\n2023,160000,2600",
          'arrests-by-substance': "Year,Heroin,Cannabis,Methamphetamine,Other\n2018,18000,22000,3000,2000\n2019,20000,25000,4500,2500\n2020,25000,32000,7500,3500\n2021,32000,42000,10000,5000\n2022,45000,60000,15000,5000\n2023,55000,75000,25000,5000",
          'seizures': "Year,Substance,Quantity_kg\n2022,Heroin,350\n2022,Cannabis,8000\n2022,Methamphetamine,150\n2023,Heroin,420\n2023,Cannabis,9500\n2023,Methamphetamine,200",
          'rehabilitation': "Provider,Type,Capacity_2023\nNDDCB,Government,800\nPrisons,Government,1500\nNGOs,Private,1200",
          'policy-timeline': "Year,Event,Administration\n2019,Major crackdown announced,Sirisena\n2021,New anti-drug task force,Rajapaksa\n2023,Operation Yukthiya begins,Wickremesinghe",
          'geographic': "Province,Arrests_2023,Treatment_Centers\nWestern,120000,15\nSouthern,15000,5\nCentral,8000,3\nNorthern,5000,2"
      };
      
      if (datasets[datasetName]) {
          data = datasets[datasetName];
          filename = `${datasetName.replace(/-/g, '_')}_data.csv`;
      } else {
          showToast('Sorry, this dataset is not yet available.', 'error');
          console.warn('Unknown or unavailable dataset:', datasetName);
          return;
      }
      
      const blob = new Blob([data], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Data download started.', 'success');
    },
  };

  /* ---------- 4. INITIALIZE APP ---------- */
  document.addEventListener('DOMContentLoaded', () => App.init());

})();
