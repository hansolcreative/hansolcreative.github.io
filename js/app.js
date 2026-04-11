document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('carouselTrack');
  const dots = document.getElementById('dots');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  const detailsTitle = document.getElementById('detailsTitle');
  const detailsSubtitle = document.getElementById('detailsSubtitle');
  const featureList = document.getElementById('featureList');
  const roadmapList = document.getElementById('roadmapList');
  const previewArea = document.getElementById('previewArea');
  const screenshotGallery = document.getElementById('screenshotGallery');

  // 'games' variable is provided by js/data.js
  let currentIndex = 0;
  let startX = 0;
  let currentTranslate = 0;
  let isDragging = false;

  if (typeof games !== 'undefined' && games.length > 0) {
    init();
  } else {
    console.error('Games data not found. Make sure js/data.js is loaded.');
  }

  function init() {
    renderSlides();
    updateCarouselPosition(true);
    setupEventListeners();
  }

  function storeButton(label, url, primary = false) {
    if (!url) {
      return `<div class="btn ${primary ? 'btn-disabled' : 'btn-secondary btn-disabled'}">${label}</div>`;
    }
    return `<a class="btn ${primary ? 'btn-primary' : 'btn-secondary'}" href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  }

  function renderSlides() {
    track.innerHTML = games.map((game) => `
      <article class="slide">
        <div class="game-card">
          <div class="game-left">
            <div class="status-row">
              <span class="badge ${game.badgeType}">${game.badge}</span>
              <span class="badge">${game.category}</span>
            </div>
            <h2 class="game-title">${game.title}</h2>
            <p class="game-subtitle">${game.subtitle}</p>
            <p class="game-description">${game.description}</p>
            <div class="tag-list">
              ${game.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="action-row">
              ${storeButton('Google Play', game.playStoreUrl, true)}
              ${storeButton('App Store', game.appStoreUrl, false)}
            </div>
          </div>
          <div class="visual-panel">
            <div class="visual-image">
              <img src="${game.heroImage}" alt="${game.heroAlt}">
            </div>
            <p class="visual-caption">${game.heroCaption}</p>
          </div>
        </div>
      </article>
    `).join('');
  }

  function renderDots() {
    dots.innerHTML = games.map((_, index) => `
      <button class="dot ${index === currentIndex ? 'active' : ''}" data-index="${index}" aria-label="${index + 1}번 게임 보기"></button>
    `).join('');

    dots.querySelectorAll('.dot').forEach((dot) => {
      dot.addEventListener('click', () => {
        goToSlide(Number(dot.dataset.index));
      });
    });
  }

  function renderDetails(game) {
    detailsTitle.textContent = game.title;
    detailsSubtitle.textContent = game.subtitle;

    featureList.innerHTML = game.features.map((item) => `
      <div class="feature-item">
        <div class="feature-icon">${item.icon}</div>
        <div>
          <h4>${item.title}</h4>
          <p>${item.text}</p>
        </div>
      </div>
    `).join('');

    roadmapList.innerHTML = game.roadmap.map((item) => `
      <div class="roadmap-item">
        <h4>${item.title}</h4>
        <p>${item.text}</p>
      </div>
    `).join('');

    if (game.preview && game.preview.type === 'youtube') {
      previewArea.innerHTML = `
        <div class="video-wrapper">
          <iframe src="${game.preview.value}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      `;
    } else if (game.preview && game.preview.type === 'image') {
      previewArea.innerHTML = `
        <div class="visual-image">
          <img src="${game.preview.value}" alt="${game.title} preview image">
        </div>
      `;
    } else {
      previewArea.innerHTML = `<div class="empty-media">Preview coming soon.</div>`;
    }

    if (game.screenshots && game.screenshots.length > 0) {
      screenshotGallery.innerHTML = game.screenshots.map((shot) => `
        <figure>
          <img src="${shot.src}" alt="${shot.caption}">
          <figcaption>${shot.caption}</figcaption>
        </figure>
      `).join('');
    } else {
      screenshotGallery.innerHTML = `<div class="empty-media" style="width: 100%;">More visuals will be shared soon.</div>`;
    }
  }

  function updateCarouselPosition(animated = true) {
    if (!animated) {
      track.style.transition = 'none';
    } else {
      track.style.transition = 'transform 0.35s ease';
    }
    currentTranslate = -currentIndex * 100;
    track.style.transform = `translateX(${currentTranslate}%)`;
    renderDots();
    renderDetails(games[currentIndex]);
  }

  function goToSlide(index) {
    currentIndex = (index + games.length) % games.length;
    updateCarouselPosition(true);
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function setupEventListeners() {
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    track.addEventListener('pointerdown', (e) => {
      isDragging = true;
      startX = e.clientX;
      track.style.transition = 'none';
    });

    window.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      const width = track.offsetWidth || 1;
      const deltaPercent = (deltaX / width) * 100;
      track.style.transform = `translateX(calc(${currentTranslate}% + ${deltaPercent}%))`;
    });

    window.addEventListener('pointerup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      const deltaX = e.clientX - startX;

      if (deltaX < -50) {
        nextSlide();
      } else if (deltaX > 50) {
        prevSlide();
      } else {
        updateCarouselPosition(true);
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    });
  }
});
