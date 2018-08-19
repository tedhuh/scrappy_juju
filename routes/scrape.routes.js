const express = require('express');
const cheerio = require('cheerio');
const request = require('request');
const router = express.Router();
const articles = require('../models/Article');

router.get('/scrape', (req, res) => {
  request('http://www.nytimes.com', function test(error, response, html) {
    const $ = cheerio.load(html);

    // An empty array to save the data that we'll scrape
    const results = [];

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

      const data = {
        title: title,
        link: link,
        summary: summary,
      };

      articles
        .create(data)
        .then((resp) => results.push(resp))
        // .then((resp) => Promise.resolve(results)) //
        // .then((jsonDta ) => res.json(jsonData)) // error you can only give response once.
        .catch((err) => reject(err));
    });
    console.log(results);
  });
});

module.exports = router;
