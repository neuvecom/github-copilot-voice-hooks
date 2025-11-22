// スムーススクロール機能
document.addEventListener('DOMContentLoaded', function() {
  // ナビゲーションリンクのスムーススクロール
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // スクロール時のヘッダー背景変更
  const header = document.querySelector('.header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
      header.style.backdropFilter = 'blur(10px)';
    } else {
      header.style.backgroundColor = '#ffffff';
      header.style.backdropFilter = 'none';
    }

    lastScroll = currentScroll;
  });

  // アニメーション観察（Intersection Observer）
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // アニメーション対象要素
  const animatedElements = document.querySelectorAll('.feature-card, .install-method, .usage-block, .platform-card, .faq-item');

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });

  // コードブロックのコピー機能
  const codeBlocks = document.querySelectorAll('.code-block');

  codeBlocks.forEach(block => {
    // コピーボタンを作成
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.innerHTML = '📋 コピー';
    copyButton.style.cssText = `
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 6px 12px;
      background-color: rgba(255, 255, 255, 0.1);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.875rem;
      transition: all 0.3s ease;
    `;

    // コードブロックを相対位置に
    block.style.position = 'relative';
    block.appendChild(copyButton);

    // コピーボタンのホバー効果
    copyButton.addEventListener('mouseenter', () => {
      copyButton.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    });

    copyButton.addEventListener('mouseleave', () => {
      copyButton.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    });

    // コピー機能
    copyButton.addEventListener('click', () => {
      const code = block.querySelector('code');
      const text = code.textContent;

      navigator.clipboard.writeText(text).then(() => {
        copyButton.innerHTML = '✅ コピー完了';
        setTimeout(() => {
          copyButton.innerHTML = '📋 コピー';
        }, 2000);
      }).catch(err => {
        console.error('コピーに失敗しました:', err);
        copyButton.innerHTML = '❌ 失敗';
        setTimeout(() => {
          copyButton.innerHTML = '📋 コピー';
        }, 2000);
      });
    });
  });

  // FAQアコーディオン機能（オプション - 将来的に追加可能）
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    // 初期状態は開いたまま（すべて表示）
    answer.style.display = 'block';
    answer.style.maxHeight = answer.scrollHeight + 'px';

    // クリックでトグル（オプション機能として無効化）
    // question.style.cursor = 'pointer';
    // question.addEventListener('click', () => {
    //   const isOpen = answer.style.display === 'block';
    //   answer.style.display = isOpen ? 'none' : 'block';
    //   answer.style.maxHeight = isOpen ? '0' : answer.scrollHeight + 'px';
    // });
  });

  // 外部リンクに target="_blank" を自動追加
  const externalLinks = document.querySelectorAll('a[href^="http"]');
  externalLinks.forEach(link => {
    if (!link.hostname.includes(window.location.hostname)) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

  // ページトップへ戻るボタン（オプション）
  const scrollToTopButton = document.createElement('button');
  scrollToTopButton.innerHTML = '⬆️';
  scrollToTopButton.className = 'scroll-to-top';
  scrollToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #667eea;
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
  `;

  document.body.appendChild(scrollToTopButton);

  // スクロール時にボタンを表示/非表示
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollToTopButton.style.opacity = '1';
      scrollToTopButton.style.visibility = 'visible';
    } else {
      scrollToTopButton.style.opacity = '0';
      scrollToTopButton.style.visibility = 'hidden';
    }
  });

  // ボタンクリックでページトップへ
  scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ボタンのホバー効果
  scrollToTopButton.addEventListener('mouseenter', () => {
    scrollToTopButton.style.backgroundColor = '#764ba2';
    scrollToTopButton.style.transform = 'scale(1.1)';
  });

  scrollToTopButton.addEventListener('mouseleave', () => {
    scrollToTopButton.style.backgroundColor = '#667eea';
    scrollToTopButton.style.transform = 'scale(1)';
  });

  // 音声カードのインタラクティブ機能
  const voiceItems = document.querySelectorAll('.voice-item');
  voiceItems.forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => {
      // 選択状態をトグル
      const isSelected = item.style.backgroundColor === 'rgb(0, 102, 204)';
      if (isSelected) {
        item.style.backgroundColor = '';
        item.style.color = '';
      } else {
        // 他の選択を解除
        voiceItems.forEach(v => {
          v.style.backgroundColor = '';
          v.style.color = '';
        });
        item.style.backgroundColor = '#0066cc';
        item.style.color = 'white';
      }
    });
  });

  console.log('GitHub Copilot Voice Hooks - ページが正常に読み込まれました');
});
