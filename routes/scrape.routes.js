const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const request = require('request');

router.get('/scrape', (req, res) => {
  request('http://www.nytimes.com', function(error, response, html) {
    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    const $ = cheerio.load(html);

    // An empty array to save the data that we'll scrape
    const results = [];

    // Select each element in the HTML body from which you want information.
    // NOTE: Cheerio selectors function similarly to jQuery's selectors,
    // but be sure to visit the package's npm page to see how it works
    $('h2.story-heading, p.summary').each(function(i, element) {
      const link = $(element)
        .children()
        .attr('href');
      const title = $(element)
        .children()
        .text();

      const summary = $(element)
        .children()
        .text();

      // Save these results in an object that we'll push into the results array we defined earlier
      results.push({
        title: title,
        link: link,
        summary: summary
      });
    });

    res.render('articles', { articles: results });

    // Log the results once you've looped through each of the elements found with cheerio
    console.log(results);
  });
});

module.exports = router;
