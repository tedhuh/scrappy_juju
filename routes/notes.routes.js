const express = require('express');
const router = express.Router();
const notes = require('../models/Notes');
const articles = require('../models/Article');

router.post('/save/notes/:id', (req, res) => {
  const articleId = req.params.id;
  console.log(articleId);
  const title = req.body.title;
  const body = req.body.body;
  const notesData = {
    title,
    body,
  };

  notes
    .create(notesData)
    .then((dataResponse) => {
      console.log(dataResponse);
      return articles.findOneAndUpdate(
        {_id: articleId},
        {note: dataResponse._id}
      );
    })
    .then((response) => {
      console.log(response);
      res.json(response);
    })
    .catch((err) => console.error(err));
});
module.exports = router;
