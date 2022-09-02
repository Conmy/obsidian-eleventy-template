const { DateTime } = require("luxon");
const markdownIt = require('markdown-it');
const markdownEmoji = require('markdown-it-emoji');
const repoName = require('git-repo-name');

module.exports = function(eleventyConfig) {
  eleventyConfig.setTemplateFormats([
    // Templates:
    "html",
    "njk",
    "md",
    // Static Assets:
    "css",
    "jpeg",
    "jpg",
    "png",
    "svg",
    "woff",
    "woff2"
  ]);

  const repo = repoName.sync();

  eleventyConfig.addPassthroughCopy("public");

  // Filters let you modify the content https://www.11ty.dev/docs/filters/
  eleventyConfig.addFilter("htmlDateString", dateObj => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  eleventyConfig.addGlobalData('pathPrefix', repo)

  const wikiLinks = require('@gardeners/markdown-it-wikilinks')({
    baseURL: '/' + repo + '/',
    relativeBaseURL: '/' + repo + '/',
    uriSuffix: '/index.html'
  });

  const markdownLibrary = markdownIt({
    html: true
  })
  .use(wikiLinks)
  .use(markdownEmoji);

  eleventyConfig.setLibrary("md", markdownLibrary);

  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk')

  eleventyConfig.addCollection("posts", function(collection) {

    /* The posts collection includes all posts that list 'posts' in the front matter 'tags'
       - https://www.11ty.dev/docs/collections/
    */

    // EDIT HERE WITH THE CODE FROM THE NEXT STEPS PAGE TO REVERSE CHRONOLOGICAL ORDER
    // (inspired by https://github.com/11ty/eleventy/issues/898#issuecomment-581738415)
    const coll = collection
      .getFilteredByTag("posts");

    // From: https://github.com/11ty/eleventy/issues/529#issuecomment-568257426
    // Adds {{ prevPost.url }} {{ prevPost.data.title }}, etc, to our njks templates
    for (let i = 0; i < coll.length; i++) {
      const prevPost = coll[i - 1];
      const nextPost = coll[i + 1];

      coll[i].data["prevPost"] = prevPost;
      coll[i].data["nextPost"] = nextPost;
    }

    return coll;
  });

  return {
    htmlTemplateEngine: "njk",
    pathPrefix: repo,
    dir: {
      input: 'src',
      includes: "_includes",
      output: 'dist'
    }
  };
}