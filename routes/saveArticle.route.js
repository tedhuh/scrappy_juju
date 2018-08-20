const express = require('express');
const articles = require('../models/Article');
const router = express.Router();

router.post('/save/article', (req, res) => {
  console.log(req.body);

  res.json(req.body);
});

module.exports = router;
