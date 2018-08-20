const express = require('express');
const articles = require('../models/Article');
const router = express.Router();

router.get('/get/articles', (req, res) => {
  articles.find({}, (err, savedArticles) => {
    // res.json(savedArticles);
    res.render('getSavedArticles', {savedArticles});
  });
});

module.exports = router;
