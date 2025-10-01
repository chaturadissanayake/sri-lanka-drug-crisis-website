/* =========================================================
   THE SHADOW WAR — V7.5 APP.JS (DOWNLOAD FIX)
   - Corrected data mapping for per-chart downloads.
   - Refactored download logic for improved reliability.
   - Ensured demographic chart (age/gender) exports all its data correctly.
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
    copy: `<svg class="icon copy-original" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`,
    check: `<svg class="icon copy-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
    plus: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
    comment: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`,
    download: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`,
    share: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>`,
    fullscreen: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>`,
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
          }, 3500);
      }, 10);
  };

  const animateValue = (element, start, end, duration, formatter) => {
    let startTime = null;
    element.textContent = formatter(start);
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
    fullDataset: null,
    
    async init() {
      this.totalSteps = $$('.step').length;
      await this.loadData();
      this.initComponents();
      this.initScrollytelling();
      this.initInteractions();
      this.initAnimations();
      this.initLightbox();
      this.preventImageRightClick();
      this.initKeyboardNavigation();
      this.initBackToTopButton();
      this.handleInitialHash();
    },

    async loadData() {
        try {
            const response = await fetch('dataset.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.fullDataset = await response.json();
        } catch (error) {
            console.error("Failed to load the dataset:", error);
            showToast("Could not load the project data. Some features may not work.", "error");
        }
    },

    initComponents() {
      // --- Theme Toggle ---
      const themeBtn = $('#theme-toggle');
      const themes = ['dark', 'light', 'high-contrast'];
      const announcer = $('.sr-announcer');

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
            'From crisis to cannabis: Sri Lanka’s president surprises with pro-market pivot.',
            'Sri Lanka has arrested tens of thousands in drug raids criticised by UN human rights body.',
            'Foreign office supporting British woman after reports of drug-smuggling arrest in Sri Lanka.',
            'Sri Lanka’s Dickwella cleared to play with doping ban lifted after appeal.',
            'Sri Lanka’s biggest drug haul linked to Dubai-based kingpin ‘Unakuruwe Shantha’.',
            'Statement by the Prime Minister: "Your cooperation is essential to eradicate drug trafficking".',
            'Sri Lanka’s biggest drug bust: Rs. 9.8 Billion haul in Tangalle.',
            'Major drug operation uncovered in Tangalle: over 600 kg of narcotics seized.',
            'Surge in drug-related arrests in 2024 reported by The Sunday Times.',
            'Sri Lanka seizes $76 million in narcotics amid intensified anti-drug crackdown.',
            'Sri Lanka marks record year in crime crackdown with major drug & weapons successes.',
            'Release of British woman jailed in Sri Lanka on drugs offences could take months.',
            'Sri Lanka Customs seizes millions worth of drugs in courier parcels.',
            'Silent epidemic: Youth drug addiction and toll on Sri Lanka’s future.',
            'Drug arrests in Sri Lanka up 41% in 2024 according to Xinhua.',
            'Is Sri Lanka becoming an international drug smuggling hub?',
            'Major drug hauls by Sri Lanka Navy and Police Narcotics Bureau in 2025.',
            'Over 122,000 arrests made in drug-related offences this year (2025).',
            'Massive drug bust in southern deep sea: 779 kg of narcotics seized, 11 arrested.',
            'Sri Lanka destroys 33 million USD heroin seized in major anti-drug raids.'
        ];
        ticker.innerHTML = [...items, ...items].map(t => `<span class="ticker-item">${t}</span>`).join('');
        const container = $('#news-ticker-container');
        container?.addEventListener('mouseenter', () => ticker.classList.add('paused'));
        container?.addEventListener('mouseleave', () => ticker.classList.remove('paused'));
        container?.addEventListener('focusin', () => ticker.classList.add('paused'));
        container?.addEventListener('focusout', () => ticker.classList.remove('paused'));
      }
      
      // --- Populate All Icons from Central Source ---
      $('.accordion-icon')?.insertAdjacentHTML('beforeend', ICONS.plus);
      $('#close-shortcuts')?.insertAdjacentHTML('beforeend', ICONS.x);
      $('#close-lightbox')?.insertAdjacentHTML('beforeend', ICONS.x);
      
      $$('.copy-btn').forEach(btn => {
        btn.innerHTML += ICONS.copy + ICONS.check + `<span class="tooltip-text">Copied!</span>`;
      });
      $$('.enlarge-icon').forEach(el => el.innerHTML = ICONS.fullscreen);
      $$('.feedback-icon').forEach(el => el.innerHTML = ICONS.comment);
      $$('.download-icon').forEach(el => el.innerHTML = ICONS.download);
      $$('.share-icon').forEach(el => el.innerHTML = ICONS.share);
      $$('.btn-data-download .download-icon').forEach(el => el.innerHTML = ICONS.download);
    },

    initScrollytelling() {
      const steps = $$('.step');
      const navContainer = $('#scrolly-nav');

      if (steps.length === 0) return;
      
      let navListHTML = '';
      steps.forEach(step => {
        const id = step.id;
        const title = step.dataset.title || `Section`;
        navListHTML += `
          <li class="scrolly-nav-item" data-step-id="${id}">
            <a href="#${id}" aria-label="Go to ${title}"></a>
            <span class="nav-label">${title}</span>
          </li>`;
      });
      if(navContainer) navContainer.innerHTML = `<ul>${navListHTML}</ul>`;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const id = entry.target.id;
          const navItem = $(`[data-step-id="${id}"]`, navContainer);

          if (entry.isIntersecting) {
            const stepIndex = parseInt(entry.target.dataset.step, 10);
            if (!isNaN(stepIndex)) {
              this.currentStep = stepIndex;
            }
            
            $$('.step').forEach(s => s.classList.remove('active'));
            entry.target.classList.add('active');
            
            $(`[data-visual="${entry.target.dataset.step}"]`)?.classList.add('is-visible');
            
            $$('.scrolly-nav-item', navContainer).forEach(item => {
              item.classList.remove('active');
              $('a', item)?.removeAttribute('aria-current');
            });

            navItem?.classList.add('active');
            $('a', navItem)?.setAttribute('aria-current', 'true');
            
            history.replaceState(null, '', `#${id}`);
          } else {
            entry.target.classList.remove('active');
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

      // --- Copy Buttons ---
      $$('.copy-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          const target = $(btn.dataset.clipboardTarget);
          if (!target) return;
          const textToCopy = target.textContent.trim();
          try {
            await navigator.clipboard.writeText(textToCopy);
            btn.classList.add('show-tooltip', 'copied');
            if (announcer) announcer.textContent = 'Copied to clipboard.';
            
            setTimeout(() => {
                btn.classList.remove('show-tooltip');
                btn.classList.remove('copied');
            }, 1500);
          } catch (err) { 
            console.error('Failed to copy:', err);
            if (announcer) announcer.textContent = 'Failed to copy.';
          }
        });
      });
      
      // --- Share Section Buttons ---
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
      
      // --- Per-Chart Data Download ---
      $$('figure .data-download-btn').forEach(btn => {
          btn.addEventListener('click', () => {
              const figure = btn.closest('figure');
              if (!figure || !figure.dataset.basename) {
                  console.error("Could not find data attributes for this chart download button.", btn);
                  showToast("Could not determine which data to download.", "error");
                  return;
              }
              const basename = figure.dataset.basename;
              this.handleChartDataDownload(basename);
          });
      });
      
      // --- Full Dataset Download ---
      $('#download-json-btn')?.addEventListener('click', (e) => {
          e.preventDefault();
          this.handleFullDatasetDownload('json');
      });
      $('#download-csv-btn')?.addEventListener('click', (e) => {
          e.preventDefault();
          this.handleFullDatasetDownload('csv');
      });

      // --- Footer Socials ---
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
      
      // --- Feedback Panels ---
      $$('.feedback-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const panel = $(`#${btn.getAttribute('aria-controls')}`);
            if (!panel) return;
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', !isExpanded);
            panel.hidden = isExpanded;
        });
      });

      // --- Shortcuts Modal ---
      const shortcutsModal = $('#shortcuts-modal');
      if (shortcutsModal) {
        const openShortcutsModal = () => this.openModal(shortcutsModal);
        const closeShortcutsModal = () => this.closeModal(shortcutsModal);
        
        $('#open-shortcuts-btn')?.addEventListener('click', openShortcutsModal);
        $('#close-shortcuts')?.addEventListener('click', closeShortcutsModal);
        
        shortcutsModal.addEventListener('click', (e) => { if (e.target === shortcutsModal) closeShortcutsModal(); });
        window.addEventListener('keydown', (e) => {
          if (e.key === '?' && e.shiftKey) { e.preventDefault(); openShortcutsModal(); }
          if (e.key === 't' && document.activeElement.tagName !== 'INPUT') $('#theme-toggle')?.click();
        });
      }
    },
    
    initAnimations() {
      // --- General fade-in animations for sections ---
      const elements = $$('.animate-on-scroll');
      if (elements.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1 });
        elements.forEach(el => observer.observe(el));
      }

      // --- Animate Big Stats when they enter view ---
      const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const target = entry.target;
            const statEl = $('.stat-number-large', target);
            if (!statEl) return;

            const formatters = {
                'animated-arrests': val => Math.round(val).toLocaleString('en-GB'),
                'animated-treatment': val => Math.round(val).toLocaleString('en-GB'),
                'animated-ratio': val => `${val.toFixed(1)}%`
            };
            const formatter = formatters[statEl.id] || (val => val);

            if (entry.isIntersecting) {
                if (statEl.dataset.animated !== 'true') {
                    statEl.dataset.animated = 'true';
                    switch (statEl.id) {
                        case 'animated-arrests': animateValue(statEl, 0, 162088, 2000, formatter); break;
                        case 'animated-treatment': animateValue(statEl, 0, 1894, 1800, formatter); break;
                        case 'animated-ratio': animateValue(statEl, 0, 1.2, 1900, formatter); break;
                    }
                }
            } else {
                statEl.dataset.animated = 'false';
                statEl.textContent = formatter(0);
            }
        });
      }, { threshold: 0.5 });
      
      $$('.stat-step').forEach(step => statObserver.observe(step));
      
      // --- Animate "In Brief" cards ---
      const takeaways = $('.takeaways-grid');
      if (takeaways) {
          const takeawayObserver = new IntersectionObserver((entries, observer) => {
              if (entries[0].isIntersecting) {
                  takeaways.classList.add('is-visible');
                  observer.unobserve(takeaways);
              }
          }, { threshold: 0.2 });
          takeawayObserver.observe(takeaways);
      }
    },

    initLightbox() {
        const lightbox = $('#image-lightbox');
        if (!lightbox) return;
        const closeBtn = $('#close-lightbox');
        const lightboxContent = $('.lightbox-content', lightbox);

        let isZoomed = false;
        let isDragging = false;
        let start = { x: 0, y: 0 };
        let position = { x: 0, y: 0 };

        const zoomIn = (e) => {
            const img = $('.lightbox-image', lightboxContent);
            if (!img) return;
            const rect = img.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            img.style.transformOrigin = `${x * 100}% ${y * 100}%`;
            img.style.transform = 'scale(2)';
            lightboxContent.classList.add('zoomed');
            isZoomed = true;
        };

        const zoomOut = () => {
            const img = $('.lightbox-image', lightboxContent);
            if (img) {
                img.style.transform = 'scale(1) translate(0px, 0px)';
                img.style.transformOrigin = 'center center';
            }
            lightboxContent.classList.remove('zoomed');
            isZoomed = false;
            position = { x: 0, y: 0 };
        };

        const startDrag = (e) => {
            if (!isZoomed) return;
            e.preventDefault();
            isDragging = true;
            start = { x: e.clientX - position.x, y: e.clientY - position.y };
            lightboxContent.style.cursor = 'grabbing';
        };

        const drag = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            position.x = e.clientX - start.x;
            position.y = e.clientY - start.y;
            const img = $('.lightbox-image', lightboxContent);
            if (img) {
                img.style.transform = `scale(2) translate(${position.x}px, ${position.y}px)`;
            }
        };
        
        const endDrag = () => {
            if (!isDragging) return;
            isDragging = false;
            lightboxContent.style.cursor = 'grab';
        };

        lightboxContent.addEventListener('click', (e) => {
            if (e.target.classList.contains('lightbox-image')) {
                if (isZoomed) zoomOut();
                else zoomIn(e);
            }
        });
        
        lightboxContent.addEventListener('mousedown', startDrag);
        lightboxContent.addEventListener('mousemove', drag);
        lightboxContent.addEventListener('mouseup', endDrag);
        lightboxContent.addEventListener('mouseleave', endDrag);

        $$('.enlarge-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const figure = btn.closest('figure');
                const basename = figure.dataset.basename;
                const image = $('.story-image', figure);
                if (!basename || !image) {
                  console.error('Could not find basename or image for lightbox.');
                  return;
                }
                
                const highResWebp = `assets/${basename}-2700.webp`;
                const highResPng = `assets/${basename}-2700.png`;

                lightboxContent.innerHTML = `
                  <picture>
                    <source type="image/webp" srcset="${highResWebp}">
                    <img src="${highResPng}" alt="${image.alt}" class="lightbox-image">
                  </picture>
                `;
                this.openModal(lightbox);
            });
        });

        const closeLightbox = () => {
            zoomOut();
            this.closeModal(lightbox);
            setTimeout(() => { lightboxContent.innerHTML = ''; }, 300);
        };

        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    },
    
    // --- Data Download Logic (REFACTORED) ---
    handleChartDataDownload(basename) {
        if (!this.fullDataset) {
            showToast("Dataset is not available. Please try again shortly.", "error");
            return;
        }

        // Special case for the demographics chart which has two data arrays
        if (basename === 'chart-treatment-admissions-by-age') {
            const dataSlice = this.fullDataset.drug_treatment_demographics_2024;
            if (!dataSlice || !dataSlice.age_distribution || !dataSlice.gender_distribution) {
                showToast(`Demographics data is incomplete.`, "error");
                return;
            }
            const ageCsv = this.jsonToCsv(dataSlice.age_distribution);
            const genderCsv = this.jsonToCsv(dataSlice.gender_distribution);
            const combinedCsv = `"Age Distribution"\n${ageCsv}\n\n"Gender Distribution"\n${genderCsv}`;
            this.triggerCsvDownload(combinedCsv, `${basename}.csv`);
            return; 
        }

        const dataSlice = this.getChartData(basename);
        if (!dataSlice || !Array.isArray(dataSlice) || dataSlice.length === 0) {
            showToast(`No specific data found for this chart.`, "error");
            console.error(`Data slice for basename '${basename}' is invalid or empty.`);
            return;
        }

        const csv = this.jsonToCsv(dataSlice);
        this.triggerCsvDownload(csv, `${basename}.csv`);
    },
    
    handleFullDatasetDownload(format) {
        if (!this.fullDataset) {
            showToast("Dataset is not available.", "error");
            return;
        }

        if (format === 'json') {
            const jsonContent = JSON.stringify(this.fullDataset, null, 2);
            const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
            const link = document.createElement("a");
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "the-shadow-war-dataset.json");
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else if (format === 'csv') {
            const csvContent = this.fullJsonToCsv(this.fullDataset);
            this.triggerCsvDownload(csvContent, 'the-shadow-war-dataset.csv');
        }
    },

    getChartData(basename) {
        const dataMap = {
            'chart-arrests-vs-treatment': 'arrests_and_treatment_official_data',
            'chart-arrests-by-substance': 'drug_specific_arrests_by_year',
            'chart-seizures-stream': 'seizures_by_year',
            'chart-presidents': 'arrests_treatment_by_year_and_president',
            'chart-provincial-case-outcomes': 'provincial_data_2024',
            'chart-rehab-providers': 'treatment_center_distribution_percentage'
        };
        const dataKey = dataMap[basename];
        return (this.fullDataset && dataKey) ? this.fullDataset[dataKey] : null;
    },

    jsonToCsv(json) {
        if (!json || json.length === 0) return '';
        const headers = Object.keys(json[0]);
        const rows = json.map(row => 
            headers.map(header => {
                let value = row[header];
                if (typeof value === 'string' && value.includes(',')) {
                    return `"${value}"`;
                }
                return value;
            }).join(',')
        );
        return [headers.join(','), ...rows].join('\n');
    },
    
    fullJsonToCsv(jsonData) {
        let csvOutput = '';
        for (const key in jsonData) {
            if (Object.hasOwnProperty.call(jsonData, key)) {
                const dataBlock = jsonData[key];
                if (Array.isArray(dataBlock)) {
                    csvOutput += `\n"${key}"\n`;
                    csvOutput += this.jsonToCsv(dataBlock);
                    csvOutput += '\n';
                } else if (typeof dataBlock === 'object' && dataBlock !== null) {
                    for (const subKey in dataBlock) {
                        if (Object.hasOwnProperty.call(dataBlock, subKey) && Array.isArray(dataBlock[subKey])) {
                            csvOutput += `\n"${key} - ${subKey}"\n`;
                            csvOutput += this.jsonToCsv(dataBlock[subKey]);
                            csvOutput += '\n';
                        }
                    }
                }
            }
        }
        return csvOutput.trim();
    },

    triggerCsvDownload(csvContent, fileName) {
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", fileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },

    // --- Modal Management ---
    openModal(modal) {
        this.lastFocusedElement = document.activeElement;
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        const focusable = $$('a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])', modal).filter(el => !el.disabled);
        if (focusable.length > 0) {
          this.firstFocusable = focusable[0];
          this.lastFocusable = focusable[focusable.length - 1];
          this.firstFocusable.focus();
        }
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
        if (e.key !== 'Tab' || !this.firstFocusable) return;
        if (e.shiftKey) {
            if (document.activeElement === this.firstFocusable) {
                this.lastFocusable.focus(); e.preventDefault();
            }
        } else {
            if (document.activeElement === this.lastFocusable) {
                this.firstFocusable.focus(); e.preventDefault();
            }
        }
    },

    preventImageRightClick() {
        document.body.addEventListener('contextmenu', e => {
            if (e.target.matches('.story-image, .lightbox-image')) e.preventDefault();
        });
    },
    
    initKeyboardNavigation() {
      window.addEventListener('keydown', (e) => {
        const isModalOpen = $('#shortcuts-modal')?.getAttribute('aria-hidden') === 'false' || $('#image-lightbox')?.getAttribute('aria-hidden') === 'false';
        if (isModalOpen || document.activeElement.tagName === 'INPUT' || e.metaKey || e.ctrlKey) return;
        
        switch(e.key) {
          case 'j': case 'ArrowDown': e.preventDefault(); this.navigateToStep(this.currentStep + 1); break;
          case 'k': case 'ArrowUp': e.preventDefault(); this.navigateToStep(this.currentStep - 1); break;
          case 'Escape':
            if ($('#image-lightbox')?.getAttribute('aria-hidden') === 'false') this.closeModal($('#image-lightbox'));
            else if ($('#shortcuts-modal')?.getAttribute('aria-hidden') === 'false') this.closeModal($('#shortcuts-modal'));
            break;
        }
      });
    },
    
    navigateToStep(stepIndex) {
      if (stepIndex < 0 || stepIndex >= this.totalSteps) return;
      const targetStep = $$('.step')[stepIndex];
      if (targetStep) {
          targetStep.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
    
    initBackToTopButton() {
        const btn = $('#back-to-top-btn');
        if (!btn) return;
        window.addEventListener('scroll', () => {
            btn.classList.toggle('visible', window.scrollY > window.innerHeight * 0.5);
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
                }, 150);
            }
        }
    },
  };

  /* ---------- 4. INITIALIZE APP ---------- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
  } else {
    App.init();
  }

})();
