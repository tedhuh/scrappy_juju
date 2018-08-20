const express = require('express');
const articles = require('../models/Article');
const router = express.Router();

router.post('/save/article', (req, res) => {
  const nyArticles = req.body;
  console.log(nyArticles);

  articles.create(nyArticles, (err, status) => {
    if (err) console.error(err);
    res.json(status);
  });
});

module.exports = router;
