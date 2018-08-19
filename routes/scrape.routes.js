const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
  res.json('testing');
});

router.get('/handle', (req, res) => {
  res.render('test');
});

module.exports = router;
