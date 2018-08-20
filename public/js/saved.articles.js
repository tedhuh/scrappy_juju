'use strict';

(function() {
  const addNotesBtn = document.querySelectorAll('#add-note-btn');
  const deleteArticleBtn = document.querySelectorAll('#delete-article-btn');

  addNotesBtn.forEach((noteBtn) => {
    noteBtn.addEventListener('click', function() {
      savedNotes(this.parentNode);
      console.log('SAVED NOTES');
    });
  });

  deleteArticleBtn.forEach((deleteBtn) => {
    deleteBtn.addEventListener('click', function() {
      deleteArticle(this.parentNode);
      console.log('DELETE ARTICLE');
    });
  });

  /**
   * this function saves your notes
   * @param {Object} articleId
   */
  function savedNotes(articleId) {
    const id = articleId.dataset.articleid;
    const url = `/save/notes/${id}`;
    const data = {
      title: 'title here',
      body: 'body here',
    };
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((respond) => respond.json())
      .then((result) => console.log(result))
      .catch((err) => {
        console.error(err);
      });
  }

  /**
   * this function deletes a article
   * @param {Object} article
   */
  function deleteArticle(article) {
    const id = article.dataset.articleid;
    const elemContainer = document.getElementById(`${id}`);
    article.parentNode.removeChild(elemContainer);
    const url = `/delete/article/${id}`;
    fetch(url, {
      method: 'DELETE',
    })
      .then((respond) => respond.json())
      .then((result) => {
        console.log(result);
        // window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  }
})();
