(function() {
  'use strict';

  // 文章加密功能
  function initArticleEncrypt() {
    var encryptContainer = document.getElementById('article-encrypt');
    if (!encryptContainer) return;

    var passwordInput = encryptContainer.querySelector('.encrypt-password');
    var submitBtn = encryptContainer.querySelector('.encrypt-submit');
    var errorMsg = encryptContainer.querySelector('.encrypt-error');
    var articleContent = document.getElementById('article-content');

    // 检查是否已经输入过密码
    var articlePath = window.location.pathname;
    var savedPassword = sessionStorage.getItem('article_pwd_' + articlePath);
    
    if (savedPassword) {
      verifyPassword(savedPassword);
    }

    // 提交密码
    submitBtn.addEventListener('click', function() {
      var password = passwordInput.value.trim();
      if (!password) {
        showError('请输入密码');
        return;
      }
      verifyPassword(password);
    });

    // 回车提交
    passwordInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        submitBtn.click();
      }
    });

    function verifyPassword(password) {
      // 这里使用简单的 SHA256 验证
      var encrypted = encryptContainer.dataset.encrypted;
      
      // 使用简单的哈希验证（实际应用中应该使用更安全的方式）
      if (password === encrypted || simpleHash(password) === encrypted) {
        // 密码正确
        sessionStorage.setItem('article_pwd_' + articlePath, password);
        encryptContainer.style.display = 'none';
        if (articleContent) {
          articleContent.style.display = 'block';
        }
      } else {
        showError('密码错误，请重试');
        passwordInput.value = '';
        passwordInput.focus();
      }
    }

    function showError(message) {
      errorMsg.textContent = message;
      errorMsg.style.display = 'block';
      setTimeout(function() {
        errorMsg.style.display = 'none';
      }, 3000);
    }

    // 简单的哈希函数（仅用于演示）
    function simpleHash(str) {
      var hash = 0;
      for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return hash.toString();
    }
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initArticleEncrypt);
  } else {
    initArticleEncrypt();
  }
})();
