(function() {
  'use strict';

  // ==========================================
  // 1. 代码块语言标签
  // ==========================================
  function initCodeBlockLanguage() {
    var codeBlocks = document.querySelectorAll('figure.highlight');
    codeBlocks.forEach(function(block) {
      // 从 figure 的 class 中提取语言（如 "highlight javascript"）
      var classList = block.className.split(' ');
      var lang = '';
      
      for (var i = 0; i < classList.length; i++) {
        if (classList[i] !== 'highlight' && classList[i] !== '') {
          lang = classList[i];
          break;
        }
      }
      
      if (lang) {
        var label = document.createElement('div');
        label.className = 'code-lang-label';
        label.textContent = lang.toUpperCase();
        block.style.position = 'relative';
        block.appendChild(label);
      }
    });
  }

  // ==========================================
  // 2. 外部链接标识
  // ==========================================
  function initExternalLinkIcon() {
    var links = document.querySelectorAll('.post-content a');
    links.forEach(function(link) {
      var href = link.getAttribute('href');
      if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
        if (!href.includes(window.location.hostname)) {
          link.classList.add('external-link');
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer');
        }
      }
    });
  }

  // ==========================================
  // 3. 代码块横向滚动优化
  // ==========================================
  function optimizeCodeScroll() {
    var codeBlocks = document.querySelectorAll('figure.highlight');
    codeBlocks.forEach(function(block) {
      block.classList.add('scrollable-code');
    });
  }

  // ==========================================
  // 初始化
  // ==========================================
  function init() {
    initCodeBlockLanguage();
    initExternalLinkIcon();
    optimizeCodeScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
