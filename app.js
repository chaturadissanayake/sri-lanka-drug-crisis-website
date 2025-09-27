/* =========================================================
   THE SHADOW WAR — V5.0 APP.JS (FINAL REDESIGN)
   - Added robust right-click prevention for images
   - Refined component interactions and initialization
   ========================================================= */

(function() {
  "use strict";

  /* ---------- 1. ICONS (Feather Icons SVG) ---------- */
  const ICONS = {
    sun: `<svg class="icon sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
    moon: `<svg class="icon moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
    x: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
    x_social: `<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>`,
    linkedin: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>`,
    instagram: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`,
    copy: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`,
    check: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
    plus: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`
  };

  /* ---------- 2. UTILITIES ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- 3. CORE MODULES ---------- */
  
  const App = {
    init() {
      this.initComponents();
      this.initScrollytelling();
      this.initInteractions();
      this.initAnimations();
      this.initLightbox();
      this.preventImageRightClick();
    },

    initComponents() {
      // --- Theme Toggle ---
      const themeBtn = $('#theme-toggle');
      if (themeBtn) {
        themeBtn.innerHTML = ICONS.sun + ICONS.moon;
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeBtn.addEventListener('click', () => {
          const currentTheme = document.documentElement.getAttribute('data-theme');
          const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
          document.documentElement.setAttribute('data-theme', newTheme);
          localStorage.setItem('theme', newTheme);
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
        container?.addEventListener('mouseenter', () => ticker.classList.add('paused'));
        container?.addEventListener('mouseleave', () => ticker.classList.remove('paused'));
      }
      
      // --- Populate Icons ---
      $('.accordion-icon')?.insertAdjacentHTML('beforeend', ICONS.plus);
      $('#close-shortcuts')?.insertAdjacentHTML('beforeend', ICONS.x);
      $('#close-lightbox')?.insertAdjacentHTML('beforeend', ICONS.x);
      $$('.copy-btn').forEach(btn => {
        btn.innerHTML += `<span class="copy-icon">${ICONS.copy}</span><span class="tooltip-text">Copied!</span>`;
      });
    },

    initScrollytelling() {
      const steps = $$('.step');
      const navContainer = $('#scrolly-nav');
      const footerNavContainer = $('#footer-nav');

      if (steps.length === 0) return;
      
      // 1. Build side & footer navigation
      let navListHTML = '';
      let footerNavHTML = '';
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
          const chart = $(`[data-visual="${entry.target.dataset.step}"]`);
          const navItem = $(`[data-step-id="${id}"]`, navContainer);

          if (entry.isIntersecting) {
            chart?.classList.add('is-visible');
            $$('.scrolly-nav-item', navContainer).forEach(item => item.classList.remove('active'));
            navItem?.classList.add('active');
          } else {
            chart?.classList.remove('is-visible');
          }
        });
      }, { rootMargin: "-50% 0px -50% 0px", threshold: 0 });

      steps.forEach(step => observer.observe(step));
    },

    initInteractions() {
      // --- Citation Tabs ---
      const tabContainer = $('.citation-tabs');
      if (tabContainer) {
        tabContainer.addEventListener('click', (e) => {
          const clickedTab = e.target.closest('.tab-button');
          if (!clickedTab) return;
          e.preventDefault();
          $$('.tab-button', tabContainer).forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
          });
          $$('.tab-panel', tabContainer).forEach(panel => panel.classList.remove('active'));
          clickedTab.classList.add('active');
          clickedTab.setAttribute('aria-selected', 'true');
          $(`#${clickedTab.getAttribute('aria-controls')}`)?.classList.add('active');
        });
      }

      // --- Copy-to-Clipboard ---
      $$('.copy-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          const target = $(btn.dataset.clipboardTarget);
          if (!target) return;
          try {
            await navigator.clipboard.writeText(target.textContent.trim());
            btn.classList.add('show-tooltip');
            const icon = $('.copy-icon', btn);
            if (icon) {
              const original = icon.innerHTML;
              icon.innerHTML = ICONS.check;
              setTimeout(() => { icon.innerHTML = original; }, 1500);
            }
            setTimeout(() => btn.classList.remove('show-tooltip'), 1200);
          } catch (err) { console.error('Failed to copy:', err); }
        });
      });

      // --- Share & Social Icons ---
      const shareContainer = $('#project-share-buttons');
      const socialContainer = $('#social-links-footer');

      if (shareContainer) {
        const shareTitle = encodeURIComponent("The Shadow War: Sri Lanka's Drug Crisis");
        const shareUrl = encodeURIComponent(window.location.href);
        const shareButtons = {
            X: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
            LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`
        };
        shareContainer.innerHTML = Object.entries(shareButtons).map(([name, url]) =>
            `<a href="${url}" target="_blank" rel="noopener" class="share-btn" aria-label="Share on ${name}">${name === 'X' ? ICONS.x_social : ICONS[name.toLowerCase()]}</a>`
        ).join('');
      }

      if (socialContainer) {
        const socialLinks = {
            Instagram: 'https://www.instagram.com/chaturadissanayake/',
            X: 'https://x.com/atakatus',
            LinkedIn: 'https://www.linkedin.com/in/chaturadissanayake/'
        };
        socialContainer.innerHTML = Object.entries(socialLinks).map(([name, url]) =>
            `<a href="${url}" target="_blank" rel="noopener" aria-label="Follow on ${name}">${name === 'X' ? ICONS.x_social : ICONS[name.toLowerCase()]}</a>`
        ).join('');
      }

      // --- Keyboard Shortcuts Modal ---
      const modal = $('#shortcuts-modal');
      if (modal) {
        const openModal = () => modal.setAttribute('aria-hidden', 'false');
        const closeModal = () => modal.setAttribute('aria-hidden', 'true');
        $('#close-shortcuts')?.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
        window.addEventListener('keydown', (e) => {
          if (e.key === '?' && e.shiftKey) { e.preventDefault(); openModal(); }
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
    },

    initLightbox() {
        const lightbox = $('#image-lightbox');
        if (!lightbox) return;

        const lightboxImage = $('.lightbox-image', lightbox);
        const lightboxCaption = $('.lightbox-caption', lightbox);
        const closeBtn = $('#close-lightbox');
        let lastFocusedElement;

        const openLightbox = (trigger) => {
            const figure = trigger.closest('figure');
            const image = $('.story-image', figure);
            const caption = $('figcaption', figure);

            if (!image || !caption) return;
            
            lastFocusedElement = document.activeElement;
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            lightboxCaption.textContent = caption.textContent;
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            closeBtn.focus();
        };

        const closeLightbox = () => {
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            lastFocusedElement?.focus();
        };

        $$('.enlarge-btn').forEach(btn => {
            btn.addEventListener('click', () => openLightbox(btn));
        });

        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        
        window.addEventListener('keydown', (e) => {
          if(e.key === 'Escape') {
            if ($('#shortcuts-modal')?.getAttribute('aria-hidden') === 'false') {
              $('#close-shortcuts').click();
            } else if (lightbox.getAttribute('aria-hidden') === 'false') {
              closeLightbox();
            }
          }
        });
    },

    preventImageRightClick() {
        $$('.story-image').forEach(img => {
            img.addEventListener('contextmenu', e => e.preventDefault());
        });
    }
  };

  /* ---------- 4. INITIALIZE APP ---------- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
  } else {
    App.init();
  }

})();
