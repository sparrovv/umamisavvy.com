module.exports = {
  eleventyComputed: {
    permalink: (data) => {
      const match = data.page.inputPath.match(/_posts\/(\d{4})-(\d{2})-(\d{2})-(.+)\.md$/);
      if (!match) {
        return false;
      }

      return `/${match[1]}/${match[2]}/${match[3]}/${match[4]}/`;
    }
  }
};
