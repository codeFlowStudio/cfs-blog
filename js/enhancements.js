(function() {
  'use strict';

  // ==========================================
  // 1. 代码块复制按钮
  // ==========================================
  function initCodeCopy() {
    var codeBlocks = document.querySelectorAll('figure.highlight');
    
    codeBlocks.forEach(function(block) {
      // 创建复制按钮
      var copyBtn = document.createElement('button');
      copyBtn.className = 'code-copy-btn';
      copyBtn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>';
      copyBtn.title = '复制代码';
      
      // 添加按钮到代码块
      block.style.position = 'relative';
      block.appendChild(copyBtn);
      
      // 复制功能
      copyBtn.addEventListener('click', function() {
        var code = block.querySelector('code') || block.querySelector('.code pre');
        var text = code ? code.innerText : '';
        
        navigator.clipboard.writeText(text).then(function() {
          // 成功反馈
          copyBtn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
          copyBtn.classList.add('success');
          
          setTimeout(function() {
            copyBtn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>';
            copyBtn.classList.remove('success');
          }, 2000);
        }).catch(function() {
          copyBtn.textContent = '失败';
        });
      });
    });
  }

  // ==========================================
  // 2. 返回顶部按钮
  // ==========================================
  function initBackToTop() {
    var backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>';
    backToTop.title = '返回顶部';
    document.body.appendChild(backToTop);
    
    // 滚动显示/隐藏
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    
    // 点击返回顶部
    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================
  // 3. 阅读进度条
  // ==========================================
  function initReadingProgress() {
    var progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    
    var progressIndicator = document.createElement('div');
    progressIndicator.className = 'reading-progress-indicator';
    progressBar.appendChild(progressIndicator);
    
    // 插入到页面顶部
    document.body.insertBefore(progressBar, document.body.firstChild);
    
    // 更新进度
    window.addEventListener('scroll', function() {
      var windowHeight = window.innerHeight;
      var documentHeight = document.documentElement.scrollHeight - windowHeight;
      var scrollTop = window.pageYOffset;
      var progress = (scrollTop / documentHeight) * 100;
      
      progressIndicator.style.width = Math.min(progress, 100) + '%';
    });
  }

  // ==========================================
  // 4. 图片懒加载和 Lightbox
  // ==========================================
  function initImageEnhancement() {
    var images = document.querySelectorAll('.post-content img');
    
    images.forEach(function(img) {
      // 懒加载
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
      
      // 添加点击放大
      img.style.cursor = 'pointer';
      img.addEventListener('click', function() {
        showLightbox(img.src, img.alt);
      });
    });
  }

  function showLightbox(src, alt) {
    // 创建 Lightbox
    var lightbox = document.createElement('div');
    lightbox.className = 'image-lightbox';
    lightbox.innerHTML = '<div class="lightbox-overlay"></div><div class="lightbox-content"><img src="' + src + '" alt="' + alt + '"><button class="lightbox-close">&times;</button></div>';
    
    document.body.appendChild(lightbox);
    
    // 阻止滚动
    document.body.style.overflow = 'hidden';
    
    // 关闭功能
    function closeLightbox() {
      lightbox.classList.add('closing');
      setTimeout(function() {
        document.body.removeChild(lightbox);
        document.body.style.overflow = '';
      }, 300);
    }
    
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);
    
    // ESC 键关闭
    document.addEventListener('keydown', function handler(e) {
      if (e.key === 'Escape') {
        closeLightbox();
        document.removeEventListener('keydown', handler);
      }
    });
  }

  // ==========================================
  // 5. 暗色模式切换
  // ==========================================
  function initDarkMode() {
    var darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.title = '切换暗色模式';
    
    // 检查本地存储
    var isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
      document.documentElement.classList.add('dark-mode');
      darkModeToggle.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/></svg>';
    } else {
      darkModeToggle.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/></svg>';
    }
    
    // 添加到 header
    var header = document.querySelector('.header-inner');
    if (header) {
      header.appendChild(darkModeToggle);
    }
    
    // 切换功能
    darkModeToggle.addEventListener('click', function() {
      document.documentElement.classList.toggle('dark-mode');
      isDark = document.documentElement.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isDark);
      
      // 更新图标
      if (isDark) {
        darkModeToggle.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/></svg>';
      } else {
        darkModeToggle.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/></svg>';
      }
    });
  }

  // ==========================================
  // 初始化所有功能
  // ========================================== 
  function init() {
    initCodeCopy();
    initBackToTop();
    initReadingProgress();
    initImageEnhancement();
    initDarkMode();
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ==========================================
  // 全局函数：社交分享和打赏
  // ==========================================
  window.showReward = function() {
    var modal = document.getElementById('rewardModal');
    if (modal) {
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeReward = function() {
    var modal = document.getElementById('rewardModal');
    if (modal) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  };
})();
