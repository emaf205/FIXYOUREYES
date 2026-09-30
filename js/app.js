/**
 * FIXYOUREYES — Swiss Editorial Minimal Web App
 * Designed for 16:9 YouTube Thumbnail Design Reference System
 * By Emanuele BDC (https://linktr.ee/emaf205)
 */

(function () {
  'use strict';

  // --- Application State ---
  const state = {
    items: [],
    filteredItems: [],
    currentPage: 1,
    itemsPerPage: 20,
    modalCurrentIndex: 0,
    currentPromptIndex: 0,
    searchQuery: '',
    currentPackFilter: null
  };

  // --- DOM Elements Cache ---
  const el = {};

  function cacheDOM() {
    el.itemsCounterBadge = document.getElementById('itemsCounterBadge');
    el.searchInput = document.getElementById('searchInput');
    el.searchClearBtn = document.getElementById('searchClearBtn');
    el.galleryGrid = document.getElementById('galleryGrid');
    el.paginationNav = document.getElementById('paginationNav');

    // Right Expandable Side Menu Elements
    el.btnOpenSideMenu = document.getElementById('btnOpenSideMenu');
    el.btnCloseSideMenu = document.getElementById('btnCloseSideMenu');
    el.sideMenuDrawer = document.getElementById('sideMenuDrawer');
    el.sideMenuBackdrop = document.getElementById('sideMenuBackdrop');

    // Reference Modal Elements
    el.referenceModal = document.getElementById('referenceModal');
    el.modalBackdrop = document.getElementById('modalBackdrop');
    el.modalCloseBtn = document.getElementById('modalCloseBtn');

    // Arrow Navigation Elements (Topbar Only)
    el.modalTopPrevBtn = document.getElementById('modalTopPrevBtn');
    el.modalTopNextBtn = document.getElementById('modalTopNextBtn');

    // Modal Content
    el.modalCounterText = document.getElementById('modalCounterText');
    el.modalImage = document.getElementById('modalImage');
    el.modalTitle = document.getElementById('modalTitle');
    el.modalPaletteSwatches = document.getElementById('modalPaletteSwatches');
    el.btnShufflePrompt = document.getElementById('btnShufflePrompt');
    el.singlePromptContainer = document.getElementById('singlePromptContainer');

    // Action Buttons
    el.btnCopyImage = document.getElementById('btnCopyImage');
    el.btnDownloadImage = document.getElementById('btnDownloadImage');
    el.btnShareReference = document.getElementById('btnShareReference');
    el.btnEmailShare = document.getElementById('btnEmailShare');
    el.toastContainer = document.getElementById('toastContainer');
  }

  // --- Initialize Application ---
  function init() {
    cacheDOM();
    loadData();
    bindEvents();
    registerServiceWorker();
    checkUrlHash();
  }

  // --- Load Reference Data ---
  function loadData() {
    if (window.VAULT_DATA && Array.isArray(window.VAULT_DATA.items)) {
      state.items = window.VAULT_DATA.items;
    } else {
      state.items = [];
    }

    state.filteredItems = [...state.items];
    updateCounterBadge();
    renderGallery();
  }

  // --- Update Dynamic Counter Badge & Subtitles ---
  function updateCounterBadge() {
    const total = state.items.length;
    const current = state.filteredItems ? state.filteredItems.length : total;

    if (el.itemsCounterBadge) {
      el.itemsCounterBadge.textContent = current;
      el.itemsCounterBadge.setAttribute('title', `${current} of ${total} AI References`);
    }

    const brandSubtitleCount = document.getElementById('brandSubtitleCount');
    if (brandSubtitleCount) {
      brandSubtitleCount.textContent = current === total ? `${total}` : `${current} / ${total}`;
    }

    const sideMenuSubtitleCount = document.getElementById('sideMenuSubtitleCount');
    if (sideMenuSubtitleCount) {
      sideMenuSubtitleCount.textContent = `${total}`;
    }

    const footerSubtitleCount = document.getElementById('footerSubtitleCount');
    if (footerSubtitleCount) {
      footerSubtitleCount.textContent = `${total}`;
    }
  }

  // --- Search & Filter ---
  function handleSearch(e) {
    state.searchQuery = e.target.value.trim().toLowerCase();
    state.currentPackFilter = null;
    state.currentPage = 1;

    if (state.searchQuery.length > 0) {
      el.searchClearBtn.classList.add('active');
    } else {
      el.searchClearBtn.classList.remove('active');
    }

    applyFilters();
  }

  function clearSearch() {
    el.searchInput.value = '';
    state.searchQuery = '';
    state.currentPackFilter = null;
    el.searchClearBtn.classList.remove('active');
    state.currentPage = 1;
    applyFilters();
    el.searchInput.focus();
  }

  function filterByPack(packName) {
    state.currentPackFilter = packName;
    state.searchQuery = '';
    el.searchInput.value = '';
    el.searchClearBtn.classList.remove('active');
    state.currentPage = 1;
    applyFilters();
    closeSideMenu();
    scrollToTopGallery();
  }

  function applyFilters() {
    let list = [...state.items];

    if (state.currentPackFilter) {
      list = list.filter((item) => item.pack === state.currentPackFilter);
    }

    if (state.searchQuery) {
      list = list.filter((item) => {
        const titleMatch = item.title && item.title.toLowerCase().includes(state.searchQuery);
        const packMatch = item.pack && item.pack.toLowerCase().includes(state.searchQuery);
        return titleMatch || packMatch;
      });
    }

    state.filteredItems = list;
    updateCounterBadge();
    renderGallery();
  }



  // --- Right Side Menu Controls ---
  function openSideMenu() {
    if (!el.sideMenuDrawer) return;
    el.sideMenuDrawer.classList.add('open');
    el.sideMenuDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeSideMenu() {
    if (!el.sideMenuDrawer) return;
    el.sideMenuDrawer.classList.remove('open');
    el.sideMenuDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // --- Gallery Rendering: 100% Uncropped 16:9 Image Only ---
  function renderGallery() {
    if (!el.galleryGrid) return;
    el.galleryGrid.innerHTML = '';

    if (state.filteredItems.length === 0) {
      el.galleryGrid.innerHTML = `
        <div class="empty-search-state">
          <p class="empty-state-title">NO REFERENCE FOUND</p>
          <p class="empty-state-subtitle">Try a different search query or clear the filter.</p>
        </div>
      `;
      renderPagination(0);
      return;
    }

    // Pagination calculations
    const totalItems = state.filteredItems.length;
    const totalPages = Math.ceil(totalItems / state.itemsPerPage);
    if (state.currentPage > totalPages) state.currentPage = totalPages;
    if (state.currentPage < 1) state.currentPage = 1;

    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const endIndex = Math.min(startIndex + state.itemsPerPage, totalItems);
    const pageItems = state.filteredItems.slice(startIndex, endIndex);

    pageItems.forEach((item, pageRelativeIndex) => {
      const globalFilteredIndex = startIndex + pageRelativeIndex;
      const card = document.createElement('article');
      card.className = 'vault-ref-card';
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `View reference: ${item.title}`);

      // ONLY FULL UNCROPPED 16:9 IMAGE with 16:9 & YOUTUBE badges
      card.innerHTML = `
        <img src="${item.image}" alt="${escapeHtml(item.title)}" loading="lazy" class="card-image">
        <span class="card-tag tag-format">16:9</span>
        <span class="card-tag tag-platform">YOUTUBE</span>
      `;

      card.addEventListener('click', () => openModal(globalFilteredIndex));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(globalFilteredIndex);
        }
      });

      el.galleryGrid.appendChild(card);
    });

    renderPagination(totalItems, startIndex + 1, endIndex, totalPages);
  }

  // --- Pagination Rendering ---
  function renderPagination(totalItems, fromIndex = 0, toIndex = 0, totalPages = 0) {
    if (!el.paginationNav) return;

    if (totalItems <= state.itemsPerPage) {
      el.paginationNav.style.display = 'none';
      return;
    }

    el.paginationNav.style.display = 'flex';
    el.paginationNav.innerHTML = '';

    const meta = document.createElement('div');
    meta.className = 'pagination-meta';
    meta.textContent = `Showing ${fromIndex} - ${toIndex} of ${totalItems} references`;
    el.paginationNav.appendChild(meta);

    const buttonsWrapper = document.createElement('div');
    buttonsWrapper.className = 'pagination-buttons';

    // Prev Button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'page-btn';
    prevBtn.textContent = '← PREV';
    prevBtn.disabled = state.currentPage === 1;
    prevBtn.addEventListener('click', () => {
      if (state.currentPage > 1) {
        state.currentPage--;
        renderGallery();
        scrollToTopGallery();
      }
    });
    buttonsWrapper.appendChild(prevBtn);

    // Numbered Buttons
    for (let p = 1; p <= totalPages; p++) {
      const pageNumBtn = document.createElement('button');
      pageNumBtn.className = `page-btn ${p === state.currentPage ? 'active' : ''}`;
      pageNumBtn.textContent = p < 10 ? `0${p}` : `${p}`;
      pageNumBtn.addEventListener('click', () => {
        if (state.currentPage !== p) {
          state.currentPage = p;
          renderGallery();
          scrollToTopGallery();
        }
      });
      buttonsWrapper.appendChild(pageNumBtn);
    }

    // Next Button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'page-btn';
    nextBtn.textContent = 'NEXT →';
    nextBtn.disabled = state.currentPage === totalPages;
    nextBtn.addEventListener('click', () => {
      if (state.currentPage < totalPages) {
        state.currentPage++;
        renderGallery();
        scrollToTopGallery();
      }
    });
    buttonsWrapper.appendChild(nextBtn);

    el.paginationNav.appendChild(buttonsWrapper);
  }

  function scrollToTopGallery() {
    const header = document.querySelector('.swiss-header');
    if (header) {
      window.scrollTo({
        top: header.offsetTop,
        behavior: 'smooth'
      });
    }
  }

  // --- Reference Detail Modal ---
  function openModal(index) {
    if (!el.referenceModal) return;
    if (index < 0) index = 0;
    if (index >= state.filteredItems.length) index = state.filteredItems.length - 1;

    state.modalCurrentIndex = index;
    // Choose initial random prompt
    state.currentPromptIndex = 0;
    updateModalContent();

    el.referenceModal.classList.add('open');
    el.referenceModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

  }

  function closeModal() {
    if (!el.referenceModal) return;
    el.referenceModal.classList.remove('open');
    el.referenceModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    // Keep gallery page synced with the currently viewed item
    const targetPage = Math.floor(state.modalCurrentIndex / state.itemsPerPage) + 1;
    if (targetPage !== state.currentPage && targetPage <= Math.ceil(state.filteredItems.length / state.itemsPerPage)) {
      state.currentPage = targetPage;
      renderGallery();
    }
  }

  function modalNext() {
    if (state.filteredItems.length <= 1) return;
    state.modalCurrentIndex = (state.modalCurrentIndex + 1) % state.filteredItems.length;
    state.currentPromptIndex = 0;
    updateModalContent();
  }

  function modalPrev() {
    if (state.filteredItems.length <= 1) return;
    state.modalCurrentIndex = (state.modalCurrentIndex - 1 + state.filteredItems.length) % state.filteredItems.length;
    state.currentPromptIndex = 0;
    updateModalContent();
  }

  function updateModalContent() {
    const item = state.filteredItems[state.modalCurrentIndex];
    if (!item) return;

    const total = state.filteredItems.length;
    const currentNumber = (state.modalCurrentIndex + 1).toString().padStart(2, '0');
    const totalNumber = total.toString().padStart(2, '0');

    el.modalCounterText.textContent = `${currentNumber} / ${totalNumber}`;
    el.modalImage.src = item.image;
    el.modalImage.alt = item.title;
    el.modalTitle.textContent = item.title;

    // Sync URL hash with active modal item
    if (item.id && window.location.hash !== '#' + item.id) {
      history.replaceState(null, '', '#' + item.id);
    }

    // Render 5 Color Palette Swatches
    el.modalPaletteSwatches.innerHTML = '';
    const palette = item.palette || ['#000000', '#333333', '#666666', '#999999', '#CCCCCC'];

    palette.forEach((hexColor) => {
      const swatch = document.createElement('div');
      swatch.className = 'color-swatch-item';
      swatch.style.backgroundColor = hexColor;
      swatch.setAttribute('title', `Click to copy ${hexColor}`);
      swatch.setAttribute('role', 'button');
      swatch.setAttribute('aria-label', `Color ${hexColor}`);

      swatch.addEventListener('click', (e) => {
        e.stopPropagation();
        copyText(hexColor, `Color ${hexColor} copied`);
      });

      el.modalPaletteSwatches.appendChild(swatch);
    });

    // Render 1 SINGLE RANDOM PROMPT for this view
    renderSingleRandomPrompt(item);

    // Update Action Button Bindings
    el.btnCopyImage.onclick = () => copyImageToClipboard(item.image, item.title);
    el.btnDownloadImage.onclick = () => downloadImage(item.image, item.filename || `${slugify(item.title)}.png`);
    el.btnShareReference.onclick = () => shareReference(item);

    // Email Share (mailto)
    const cleanUrl = window.location.href.split('#')[0];
    const directUrl = `${cleanUrl}#${item.id}`;
    const emailSubject = encodeURIComponent(`FIXYOUREYES Reference: ${item.title}`);
    const emailBody = encodeURIComponent(
      `Check out this 16:9 YouTube Thumbnail reference from FIXYOUREYES:\n\nStyle: ${item.title}\nPack: ${item.pack}\nDirect Link: ${directUrl}\n\nAn open source project by Emanuele BDC (https://linktr.ee/emaf205)`
    );
    el.btnEmailShare.href = `mailto:?subject=${emailSubject}&body=${emailBody}`;

    // Shuffle Button Binding
    el.btnShufflePrompt.onclick = () => {
      shufflePrompt(item);
    };
  }

  // --- Render 1 Single Random Prompt ---
  function renderSingleRandomPrompt(item) {
    if (!el.singlePromptContainer) return;
    el.singlePromptContainer.innerHTML = '';

    const pool = item.promptPool || [
      'Use attached image as visual reference for color palette, lighting, and composition. Create a high-CTR YouTube thumbnail about [TOPIC].',
      'Creator portrait in the exact artistic direction, lighting, and visual contrast of the attached reference image.',
      'Conceptual visual hook representing [TOPIC]: matching the mood, texture, and crisp framing of the attached reference.'
    ];

    // Pick random index
    if (state.currentPromptIndex === 0) {
      state.currentPromptIndex = Math.floor(Math.random() * pool.length);
    }

    const currentPromptText = pool[state.currentPromptIndex % pool.length];

    const card = document.createElement('div');
    card.className = 'prompt-card-item';
    card.innerHTML = `
      <div class="prompt-card-top">
        <span class="prompt-tag-badge">AI PROMPT RECIPE</span>
        <button class="btn-copy-prompt" title="Copy prompt to clipboard">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          <span>COPY PROMPT</span>
        </button>
      </div>
      <p class="prompt-text-box">${escapeHtml(currentPromptText)}</p>
    `;

    const copyBtn = card.querySelector('.btn-copy-prompt');
    copyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      copyText(currentPromptText, 'Prompt copied to clipboard');
    });

    el.singlePromptContainer.appendChild(card);
  }

  function shufflePrompt(item) {
    const pool = item.promptPool || [];
    if (pool.length <= 1) return;
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * pool.length);
    } while (nextIndex === state.currentPromptIndex && pool.length > 1);

    state.currentPromptIndex = nextIndex;
    renderSingleRandomPrompt(item);
    showToast('New prompt generated');
  }

  // --- Action 1: Copy Image to Clipboard ---
  async function copyImageToClipboard(imageSrc, title) {
    try {
      showToast('Copying image...');
      const response = await fetch(imageSrc);
      const blob = await response.blob();

      if (navigator.clipboard && window.ClipboardItem) {
        const pngBlob = blob.type === 'image/png' ? blob : await convertBlobToPng(blob);
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': pngBlob })
        ]);
        showToast('Image copied to clipboard');
      } else {
        const absoluteUrl = new URL(imageSrc, window.location.href).href;
        await navigator.clipboard.writeText(absoluteUrl);
        showToast('Image link copied to clipboard');
      }
    } catch (err) {
      try {
        const absoluteUrl = new URL(imageSrc, window.location.href).href;
        await navigator.clipboard.writeText(absoluteUrl);
        showToast('Image link copied to clipboard');
      } catch (e) {
        showToast('Could not copy image');
      }
    }
  }

  function convertBlobToPng(blob) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((pngBlob) => {
          if (pngBlob) resolve(pngBlob);
          else reject(new Error('Canvas conversion to PNG failed'));
        }, 'image/png');
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(blob);
    });
  }

  // --- Action 2: Download Image ---
  function downloadImage(imageSrc, filename) {
    const a = document.createElement('a');
    a.href = imageSrc;
    a.download = filename || 'thumbnail_reference.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Image downloaded');
  }

  // --- Action 3: Share Reference ---
  async function shareReference(item) {
    const cleanUrl = window.location.href.split('#')[0];
    const shareUrl = `${cleanUrl}#${item.id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `FIXYOUREYES — ${item.title}`,
          text: `Selected AI Reference: ${item.title} by Emanuele BDC`,
          url: shareUrl
        });
      } catch (err) {}
    } else {
      copyText(shareUrl, 'Link copied to clipboard');
    }
  }

  // --- Copy Text Helper ---
  function copyText(text, successMessage) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMessage);
      }).catch(() => {
        fallbackCopyText(text, successMessage);
      });
    } else {
      fallbackCopyText(text, successMessage);
    }
  }

  function fallbackCopyText(text, successMessage) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(successMessage);
    } catch (e) {
      showToast('Could not copy');
    }
    document.body.removeChild(textArea);
  }

  // --- Swiss Toast Notification Banner ---
  let toastTimeout;
  function showToast(message) {
    if (!el.toastContainer) return;
    el.toastContainer.innerHTML = '';
    clearTimeout(toastTimeout);

    const toast = document.createElement('div');
    toast.className = 'swiss-toast';
    toast.textContent = message;
    el.toastContainer.appendChild(toast);

    toastTimeout = setTimeout(() => {
      toast.remove();
    }, 2400);
  }

  // --- Check URL Hash on Load ---
  function checkUrlHash() {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    const itemIndex = state.items.findIndex((item) => item.id === hash);
    if (itemIndex !== -1) {
      openModal(itemIndex);
    }
  }

  // --- Bind All Events ---
  function bindEvents() {
    // Search input
    el.searchInput.addEventListener('input', handleSearch);
    el.searchClearBtn.addEventListener('click', clearSearch);

    // Right Side Menu Events
    if (el.btnOpenSideMenu) el.btnOpenSideMenu.addEventListener('click', openSideMenu);
    if (el.btnCloseSideMenu) el.btnCloseSideMenu.addEventListener('click', closeSideMenu);
    if (el.sideMenuBackdrop) el.sideMenuBackdrop.addEventListener('click', closeSideMenu);

    // Modal close
    el.modalCloseBtn.addEventListener('click', closeModal);
    el.modalBackdrop.addEventListener('click', closeModal);

    // Modal Navigation (Unified Topbar Only)
    if (el.modalTopPrevBtn) el.modalTopPrevBtn.addEventListener('click', modalPrev);
    if (el.modalTopNextBtn) el.modalTopNextBtn.addEventListener('click', modalNext);

    // URL Hash Change Listener (Back Button Support)
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) {
        if (el.referenceModal && el.referenceModal.classList.contains('open')) {
          closeModal();
        }
      } else {
        const itemIndex = state.filteredItems.findIndex((item) => item.id === hash);
        if (itemIndex !== -1 && itemIndex !== state.modalCurrentIndex) {
          openModal(itemIndex);
        }
      }
    });

    // Keyboard Navigation
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (el.sideMenuDrawer && el.sideMenuDrawer.classList.contains('open')) {
          e.preventDefault();
          closeSideMenu();
          return;
        }
        if (el.referenceModal && el.referenceModal.classList.contains('open')) {
          e.preventDefault();
          closeModal();
          return;
        }
      }

      if (e.key === '/' && document.activeElement !== el.searchInput) {
        if (!el.referenceModal.classList.contains('open') && !el.sideMenuDrawer.classList.contains('open')) {
          e.preventDefault();
          el.searchInput.focus();
        }
      }

      if (el.referenceModal && el.referenceModal.classList.contains('open')) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          modalPrev();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          modalNext();
        }
      }
    });

    // Touch Swipe Navigation for Mobile
    let touchStartX = 0;
    let touchEndX = 0;

    el.referenceModal.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    el.referenceModal.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diffX = touchEndX - touchStartX;
      if (Math.abs(diffX) > 50) {
        if (diffX < 0) modalNext();
        else modalPrev();
      }
    }, { passive: true });
  }

  // --- Utility Helpers ---
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '_')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '_');
  }

  // --- Progressive Web App (PWA) Registration ---
  function registerServiceWorker() {
    if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost')) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(() => {});
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
