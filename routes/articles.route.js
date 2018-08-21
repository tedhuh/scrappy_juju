const express = require('express');
const articles = require('../models/Article');
const router = express.Router();

router.get('/get/articles', (req, res) => {
  // articles.find({}, (err, savedArticles) => {
  //   res.json(savedArticles);
  //   res.render('articles', {savedArticles});
  // });

  articles
    .find({})
    .populate('note')
    // .exec((err, res) => {
    //   console.log(res);
    //   return res;
    // })
    .then((savedArticles) => {
      // res.json(savedArticles);
      // console.log(savedArticles);
      res.render('articles', {savedArticles});
    })
    .catch((err) => console.error(err));
});

// router.get('/articles/:id', (req, res) => {
//   const id = req.params.id;
//   articles
//     .findOne({_id: id})
//     .populate('note')
//     .then((articleDb) => {
//       console.log(articleDb);
//       return res.json(articleDb);
//     })
//     .catch((err) => console.error(err));
// });

router.post('/save/article', (req, res) => {
  const nyArticles = req.body;
  console.log(nyArticles);

  articles.create(nyArticles, (err, status) => {
    if (err) console.error(err);
    res.json(status);
  });
});

router.delete('/delete/article/:id', (req, res) => {
  const id = req.params.id;
  articles.deleteOne({_id: id}, (err, status) => {
    if (err) console.error(err);
    console.log(status);
  });
});

module.exports = router;
