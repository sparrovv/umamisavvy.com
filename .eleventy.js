const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("fonts");

  // Handle Jekyll-style dates in posts
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toLocaleString(DateTime.DATE_FULL);
  });

  eleventyConfig.addFilter("rfc822Date", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toRFC2822();
  });

  eleventyConfig.addFilter("destinationPosts", (posts, destinationId) => {
    return posts.filter(post => post.data.destination === destinationId);
  });

  // Create a collection for posts
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("_posts/*.md").reverse();
  });

  // Generate search data
  eleventyConfig.addCollection("searchData", function(collectionApi) {
    const posts = collectionApi.getFilteredByGlob("_posts/*.md");
    return posts.map(post => ({
      title: post.data.title,
      url: post.url,
      date: post.date,
      excerpt: post.data.subtitle || post.data.description || ''
    }));
  });

  // Ignore directories
  eleventyConfig.ignores.add("AGENTS.md");
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("_drafts/**");
  eleventyConfig.ignores.add("_old_layouts/**");
  eleventyConfig.ignores.add("_layouts/**");
  eleventyConfig.ignores.add("less/**");
  eleventyConfig.ignores.add("node_modules/**");

  return {
    dir: {
      input: ".",
      includes: "_includes",
      layouts: "_includes/layouts",
      data: "_data",
      output: "_site"
    },
    // Enable all template formats that your posts might use
    templateFormats: ["md", "njk", "html", "xml"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
}; 
