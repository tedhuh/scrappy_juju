'use strict';

(function() {
  const addNotesBtn = document.querySelectorAll('#add-note-btn');
  const deleteArticleBtn = document.querySelectorAll('#delete-article-btn');
  const submitNotesBtn = document.querySelector('#submit-notes-btn');
  const idHolder = document.getElementById('article-id-holder');

  submitNotesBtn.addEventListener('click', function() {
    const id = idHolder.innerText;
    submitNotes(id);
  });
  /**
   * this function submit and save
   * @param {Object} articleId
   */
  function submitNotes(articleId) {
    const title = document.getElementById('title-note').value;
    const body = document.getElementById('body-note').value;
    // ! TESTING ==========
    const url = `/save/notes/${articleId}`;
    const data = {
      title,
      body,
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

  addNotesBtn.forEach((noteBtn) => {
    noteBtn.addEventListener('click', function() {
      // TODO: create a modal to show and add notes
      // showNotesModal(this.parentNode);
      // .setAttribute('id', )
      const id = this.parentNode.dataset.articleid;
      idHolder.innerText = id;
      // submitNotes(this);
      // console.log(this.parentNode);
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
   * @param {Object} id
   */
  function showNotesModal(id) {
    // // const id = articleId.dataset.articleid;
    // // ! TESTING ==========
    // const idHolder = document.getElementById('article-id-holder');
    // const title = document.getElementById('title-note').value;
    // const body = document.getElementById('body-note').value;
    // idHolder.innerText = id;
    // // ! TESTING ==========
    // const url = `/save/notes/${id}`;
    // const data = {
    //   title,
    //   body,
    // };
    // fetch(url, {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then((respond) => respond.json())
    //   .then((result) => console.log(result))
    //   .catch((err) => {
    //     console.error(err);
    //   });
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
