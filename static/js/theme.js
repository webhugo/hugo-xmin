// Consolidated theme functionality
(function() {
  'use strict';

  // Theme toggle functionality
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeText = document.querySelector('.theme-text');
    
    if (savedTheme === 'dark') {
      document.body.setAttribute('data-theme', 'dark');
      if (themeText) themeText.textContent = 'Light';
    } else if (themeText) {
      themeText.textContent = 'Dark';
    }
  }

  window.toggleTheme = function() {
    const body = document.body;
    const text = document.querySelector('.theme-text');
    
    if (body.getAttribute('data-theme') === 'dark') {
      body.removeAttribute('data-theme');
      text.textContent = 'Dark';
      localStorage.setItem('theme', 'light');
    } else {
      body.setAttribute('data-theme', 'dark');
      text.textContent = 'Light';
      localStorage.setItem('theme', 'dark');
    }
  };

  // TOC functionality
  window.toggleTOC = function() {
    const toc = document.getElementById('toc');
    if (toc) {
      toc.classList.toggle('open');
    }
  };

  // Initialize on DOM ready
  function init() {
    initTheme();
    
    // Close TOC when clicking outside
    document.addEventListener('click', function(event) {
      const toc = document.getElementById('toc');
      const toggle = document.querySelector('.toc-toggle');
      
      if (toc && toggle && toc.classList.contains('open')) {
        if (!toc.contains(event.target) && !toggle.contains(event.target)) {
          toc.classList.remove('open');
        }
      }
    });

    // Smooth scroll for TOC links
    const tocLinks = document.querySelectorAll('.toc a');
    tocLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Close TOC after clicking a link
          const toc = document.getElementById('toc');
          if (toc) {
            toc.classList.remove('open');
          }
        }
      });
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();