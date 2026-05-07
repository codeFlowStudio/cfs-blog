(function() {
  'use strict';

  var searchInput = document.getElementById('search-input');
  var searchResults = document.getElementById('search-results');
  var searchStats = document.getElementById('search-stats');
  var searchLoading = document.getElementById('search-loading');
  var searchData = [];
  var isDataLoaded = false;

  // Load search data
  function loadSearchData() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/cfs-blog/search.xml', true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        parseSearchData(xhr.responseText);
        isDataLoaded = true;
        searchLoading.style.display = 'none';
      }
    };
    xhr.onerror = function() {
      searchLoading.textContent = '加载搜索数据失败';
    };
    xhr.send();
  }

  // Parse search XML data
  function parseSearchData(xmlString) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    var entries = xmlDoc.querySelectorAll('entry');
    
    searchData = [];
    entries.forEach(function(entry) {
      var title = entry.querySelector('title');
      var link = entry.querySelector('link');
      var content = entry.querySelector('content');
      
      if (title && link) {
        searchData.push({
          title: title.textContent || '',
          link: link.getAttribute('href') || '',
          content: content ? content.textContent : ''
        });
      }
    });
  }

  // Search function
  function performSearch(query) {
    if (!query || query.trim() === '') {
      searchResults.innerHTML = '';
      searchStats.innerHTML = '';
      return;
    }

    var lowerQuery = query.toLowerCase();
    var results = [];

    searchData.forEach(function(item) {
      var titleMatch = item.title.toLowerCase().indexOf(lowerQuery) !== -1;
      var contentMatch = item.content.toLowerCase().indexOf(lowerQuery) !== -1;
      
      if (titleMatch || contentMatch) {
        var preview = getPreview(item.content, query);
        results.push({
          title: item.title,
          link: item.link,
          preview: preview,
          isTitleMatch: titleMatch
        });
      }
    });

    displayResults(results, query);
  }

  // Get content preview
  function getPreview(content, query) {
    if (!content) return '';
    
    var lowerContent = content.toLowerCase();
    var lowerQuery = query.toLowerCase();
    var index = lowerContent.indexOf(lowerQuery);
    
    if (index === -1) return '';
    
    var start = Math.max(0, index - 50);
    var end = Math.min(content.length, index + query.length + 50);
    var preview = content.substring(start, end);
    
    if (start > 0) preview = '...' + preview;
    if (end < content.length) preview = preview + '...';
    
    return preview;
  }

  // Display search results
  function displayResults(results, query) {
    if (results.length === 0) {
      searchResults.innerHTML = '<div class="no-results">未找到相关文章</div>';
      searchStats.innerHTML = '';
      return;
    }

    searchStats.innerHTML = '找到 ' + results.length + ' 篇文章';
    
    var html = '';
    results.forEach(function(result) {
      html += '<div class="search-result-item">';
      html += '<h3 class="search-result-title">';
      html += '<a href="' + result.link + '">' + highlightText(result.title, query) + '</a>';
      html += '</h3>';
      if (result.preview) {
        html += '<div class="search-result-preview">' + highlightText(result.preview, query) + '</div>';
      }
      html += '</div>';
    });

    searchResults.innerHTML = html;
  }

  // Highlight matched text
  function highlightText(text, query) {
    if (!query) return text;
    var regex = new RegExp('(' + escapeRegExp(query) + ')', 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  // Escape special characters for regex
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Event listeners
  if (searchInput) {
    var debounceTimer;
    searchInput.addEventListener('input', function(e) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function() {
        if (isDataLoaded) {
          performSearch(e.target.value);
        } else {
          searchResults.innerHTML = '<div class="search-loading">搜索数据加载中...</div>';
        }
      }, 300);
    });

    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        clearTimeout(debounceTimer);
        if (isDataLoaded) {
          performSearch(e.target.value);
        }
      }
    });
  }

  // Focus search input on page load
  if (searchInput) {
    searchInput.focus();
  }

  // Initialize
  loadSearchData();
})();
