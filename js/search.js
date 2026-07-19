document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  let searchData = [];

  // Fetch search data
  fetch('/search.json')
    .then(response => response.json())
    .then(data => {
      searchData = data.pages;
    });

  // Search function
  function search(query) {
    if (!query) {
      searchResults.style.display = 'none';
      return;
    }

    const results = searchData.filter(page => {
      const titleMatch = page.title.toLowerCase().includes(query.toLowerCase());
      const excerptMatch = page.excerpt.toLowerCase().includes(query.toLowerCase());
      return titleMatch || excerptMatch;
    });

    displayResults(results.slice(0, 5)); // Show only top 5 results
  }

  // Display results
  function displayResults(results) {
    if (results.length === 0) {
      searchResults.style.display = 'none';
      return;
    }

    searchResults.innerHTML = results.map(page => `
      <a href="${page.url}" class="list-group-item">
        <h4 class="list-group-item-heading">${page.title}</h4>
        ${page.excerpt ? `<p class="list-group-item-text">${page.excerpt}</p>` : ''}
      </a>
    `).join('');

    searchResults.style.display = 'block';
  }

  // Event listeners
  searchInput.addEventListener('input', (e) => {
    search(e.target.value);
  });

  // Close search results when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchResults.contains(e.target) && e.target !== searchInput) {
      searchResults.style.display = 'none';
    }
  });
}); 