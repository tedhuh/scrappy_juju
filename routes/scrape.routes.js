const express = require('express');
const cheerio = require('cheerio');
const request = require('request');
const router = express.Router();
// const articles = require('../models/Article');

router.get('/scrape', (req, res) => {
  request('http://www.nytimes.com', function(error, response, html) {
    const $ = cheerio.load(html);
    // An empty array to save the data that we'll scrape
    const results = [];

    $('div.css-6p6lnl').each(function(element) {
      const link = $(element)
        .children()
        .attr('href');
      const title = $(element)
        .children('balancedHeadline')
        .text();
      const summary = $(element)
        .children('p.css-dz277d')
        // .nextAll('p.summary')
        .text();
      console.log(link);
      const data = {
        title: title,
        link: link,
        summary: summary,
      };
      results.push(data);
    });
    res.json(results);
  });
});

// router.get('/scrape', (req, res) => {
//   request('http://www.nytimes.com', function test(error, response, html) {
//     const $ = cheerio.load(html);
//     const promises = $('h2.story-heading, p.summary')
//       .get() // as in jQuery, .get() unwraps Cheerio and returns Array
//       .map(function(element) {
//         // this is Array.prototype.map()
//         return articles
//           .create({
//             title: $(element)
//               .children()
//               .text(),
//             link: $(element)
//               .children()
//               .attr('href'),
//             summary: $(element)
//               .children()
//               .text(),
//           })
//           .catch((err) => {
//             // catch so any one failure doesn't scupper the whole scrape.
//             return {}; // on failure of articles.create(), inject some kind of default object (or string or whatever).
//           });
//       });
//     // At this point, you have an array of promises, which need to be aggregated with Promise.all().
//     Promise.all(promises).then((results) => {
//       // Promise.all() should accept whatever promises are returned by articles.create().
//       console.log(results);
//       res.json(results);
//     });
//   });
// });

// router.get('/scrape', (req, res) => {
//   request('http://www.nytimes.com', function test(error, response, html) {
//     const $ = cheerio.load(html);

//     // An empty array to save the data that we'll scrape
//     const results = [];

//     $('h2.story-heading, p.summary').each(function(i, element) {
//       const link = $(element)
//         .children()
//         .attr('href');
//       const title = $(element)
//         .children()
//         .text();
//       const summary = $(element)
//         .children()
//         .text();

//       const data = {
//         title: title,
//         link: link,
//         summary: summary,
//       };

//       const articleCreate = articles.create(data);
//       results.push(articleCreate);
//     });

//     Promise.all(results).then((allResults) => {
//       console.log(allResults);
//       res.json(allResults);
//     });

//     // or you could use array.reduce for sequantial resolve instead of Promise.all
//   });
// });

module.exports = router;
