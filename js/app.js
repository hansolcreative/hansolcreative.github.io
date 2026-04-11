document.addEventListener('DOMContentLoaded', () => {
  const gamesGrid = document.getElementById('gamesGrid');
  const detailsArea = document.getElementById('detailsArea');
  
  const detailsTitle = document.getElementById('detailsTitle');
  const detailsSubtitle = document.getElementById('detailsSubtitle');
  const detailBadge = document.getElementById('detailBadge');
  const featureList = document.getElementById('featureList');
  const roadmapList = document.getElementById('roadmapList');
  const previewArea = document.getElementById('previewArea');
  const screenshotGallery = document.getElementById('screenshotGallery');

  // I18N Setup
  // Priority: 1. Manually saved lang, 2. Browser language (if ko, use ko, else en)
  let currentLang = localStorage.getItem('lang') || (navigator.language.startsWith('ko') ? 'ko' : 'en');
  
  const translations = {
    ko: {
      studioSubtitle: "함께 즐거움을 나누는 게임 스튜디오",
      heroTitle: "누구나 즐겁게 몰입할 수 있는<br>게임을 만듭니다.",
      heroCopy: "Hansol Creative는 플레이어의 일상에 작은 즐거움이 되는 친숙한 게임들을 고민합니다.<br>복잡한 매뉴얼 없이도 누구나 자연스럽게 스며들 수 있는 경험을 목표로 합니다.",
      ourGames: "Our Games",
      ourGamesSub: "현재 공개된 타이틀과 준비 중인 프로젝트들을 만나보세요.",
      viewDetails: "자세히 보기",
      closeDetails: "상세 정보 닫기",
      studioVision: "플레이어와 함께 성장하는 스튜디오",
      studioCopy: "기술적인 화려함보다는 플레이어의 목소리에 더 귀를 기울입니다.<br>한 명의 개발자가 만드는 작은 세상이지만, 그 안에서 느끼는 재미와 따뜻함은 누구나 선명하게 경험할 수 있도록 다듬고 또 다듬습니다.",
      contact: "문의:",
      screenshots: "📸 스크린샷",
      roadmap: "📅 로드맵",
      features: "✨ 주요 특징",
      previewTitle: "📺 영상 미리보기",
      emptyMedia: "준비 중입니다."
    },
    en: {
      studioSubtitle: "Sharing Joy Through Games",
      heroTitle: "Creating Games Everyone<br>Can Get Immersed In.",
      heroCopy: "Hansol Creative develops familiar games that bring small joy to players' daily lives.<br>We aim for experiences where anyone can naturally settle in without complex manuals.",
      ourGames: "Our Games",
      ourGamesSub: "Meet our released titles and projects currently in development.",
      viewDetails: "View Details",
      closeDetails: "Close Details",
      studioVision: "A Studio Growing with Players",
      studioCopy: "We listen to the voices of players rather than focusing only on technical flair.<br>Crafted by a solo developer, we strive to deliver warmth and fun that anyone can clearly experience.",
      contact: "Contact:",
      screenshots: "📸 Screenshots",
      roadmap: "📅 Roadmap",
      features: "✨ Key Features",
      previewTitle: "📺 Visual Preview",
      emptyMedia: "Coming soon."
    }
  };

  function updateStaticUI() {
    document.title = currentLang === 'ko' ? "Hansol Creative | 인디 게임 스튜디오" : "Hansol Creative | Indie Game Studio";
    
    // Select elements with data-t attribute
    document.querySelectorAll('[data-t]').forEach(el => {
      const key = el.getAttribute('data-t');
      if (translations[currentLang][key]) {
        el.innerHTML = translations[currentLang][key];
      }
    });

    // Update body class for lang-specific styling if needed
    document.body.setAttribute('lang', currentLang);
  }

  window.toggleLanguage = (lang) => {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    updateStaticUI();
    renderGrid();
    if (detailsArea.classList.contains('active')) {
      // If details are open, refresh them
      const activeIdx = detailsArea.getAttribute('data-active-index');
      if (activeIdx !== null) showDetails(parseInt(activeIdx));
    }
    updateLangButtons();
  };

  function updateLangButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('onclick').includes(currentLang));
    });
  }

  function storeButton(label, url, primary = false) {
    if (!url) return '';
    return `<a class="btn ${primary ? 'btn-primary' : 'btn-secondary'}" href="${url}" target="_blank" rel="noopener noreferrer" style="flex: 1;">${label}</a>`;
  }

  function renderGrid() {
    gamesGrid.innerHTML = games.map((game, index) => `
      <div class="game-card">
        <div class="card-visual">
          <span class="badge ${game.badgeType} card-badge">${game.badge[currentLang]}</span>
          ${game.heroImage ? `<img src="${game.heroImage}" alt="${game.heroAlt}" onerror="this.style.display='none'">` : ''}
        </div>
        <div class="card-body">
          <div class="game-cat">${game.category[currentLang]}</div>
          <h4>${game.title[currentLang]}</h4>
          <p class="card-desc">${game.description[currentLang]}</p>
          <div class="card-tags">
            ${game.tags[currentLang].map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
          <div class="action-row">
            ${storeButton('Google Play', game.playStoreUrl, true)}
            ${storeButton('App Store', game.appStoreUrl, false)}
          </div>
          <button class="btn-detail" onclick="showDetails(${index})">${translations[currentLang].viewDetails}</button>
        </div>
      </div>
    `).join('');
  }

  window.showDetails = (index) => {
    const game = games[index];
    detailsArea.setAttribute('data-active-index', index);
    
    detailsTitle.textContent = game.title[currentLang];
    detailsSubtitle.textContent = game.subtitle[currentLang];
    detailBadge.innerHTML = `<span class="badge ${game.badgeType}">${game.badge[currentLang]}</span> <span class="badge">${game.category[currentLang]}</span>`;

    featureList.innerHTML = game.features.map((item) => `
      <div class="feature-item" style="display: flex; gap: 12px; margin-bottom: 16px;">
        <div class="feature-icon" style="flex-shrink: 0; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; background: #f1f5f9; border-radius: 10px;">${item.icon}</div>
        <div>
          <h5 style="margin: 0; font-size: 1rem; color: #1e293b;">${item.title[currentLang]}</h5>
          <p style="margin: 4px 0 0; color: #64748b; font-size: 0.9rem;">${item.text[currentLang]}</p>
        </div>
      </div>
    `).join('');

    roadmapList.innerHTML = game.roadmap.map((item) => `
      <div class="roadmap-item" style="padding-left: 16px; border-left: 3px solid var(--primary); margin-bottom: 16px;">
        <h5 style="margin: 0; font-size: 1rem; color: #1e293b;">${item.title[currentLang]}</h5>
        <p style="margin: 4px 0 0; color: #64748b; font-size: 0.9rem;">${item.text[currentLang]}</p>
      </div>
    `).join('');

    if (game.preview && game.preview.type === 'youtube') {
      previewArea.innerHTML = `
        <div class="video-wrapper" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 16px;">
          <iframe src="${game.preview.value}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen></iframe>
        </div>
      `;
    } else {
      previewArea.innerHTML = `<div class="empty-media" style="padding: 40px; text-align: center; background: #f8fafc; border-radius: 16px; color: #94a3b8;">${translations[currentLang].emptyMedia}</div>`;
    }

    if (game.screenshots && game.screenshots.length > 0) {
      screenshotGallery.innerHTML = game.screenshots.map((shot) => `
        <figure style="margin: 0;">
          <img src="${shot.src}" alt="${shot.caption}">
          <figcaption style="font-size: 0.8rem; color: #94a3b8; margin-top: 10px; text-align: center;">${shot.caption}</figcaption>
        </figure>
      `).join('');
    } else {
      screenshotGallery.innerHTML = `<div class="empty-media" style="width: 100%; padding: 40px; text-align: center; background: #f8fafc; border-radius: 16px; color: #94a3b8;">${translations[currentLang].emptyMedia}</div>`;
    }

    detailsArea.classList.add('active');
    detailsArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Initial Load
  updateStaticUI();
  updateLangButtons();
  renderGrid();
});
