document.addEventListener('DOMContentLoaded', function() {
  var navbarCollapse = document.getElementById('bs-example-navbar-collapse-1');
  var navbarToggle = document.querySelector('.navbar-toggle');

  if (!navbarCollapse || !navbarToggle) {
    return;
  }

  function isMenuOpen() {
    return navbarCollapse.classList.contains('in') || navbarCollapse.classList.contains('collapsing');
  }

  function closeMenu() {
    if (!isMenuOpen()) {
      return;
    }

    if (window.jQuery && window.jQuery.fn && window.jQuery.fn.collapse) {
      window.jQuery(navbarCollapse).collapse('hide');
      return;
    }

    navbarCollapse.classList.remove('in');
    navbarToggle.classList.add('collapsed');
    navbarToggle.setAttribute('aria-expanded', 'false');
    navbarCollapse.setAttribute('aria-expanded', 'false');
  }

  navbarToggle.addEventListener('click', function(event) {
    if (isMenuOpen()) {
      event.preventDefault();
      event.stopPropagation();
      closeMenu();
    }
  });

  navbarCollapse.addEventListener('click', function(event) {
    if (event.target.closest('a')) {
      closeMenu();
    }
  });

  document.addEventListener('click', function(event) {
    if (
      isMenuOpen() &&
      !navbarCollapse.contains(event.target) &&
      !navbarToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });
});
