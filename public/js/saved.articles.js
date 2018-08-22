'use strict';

(function() {
  const addNotesBtn = document.querySelectorAll('#add-note-btn');
  const deleteArticleBtn = document.querySelectorAll('#delete-article-btn');
  const submitNotesBtn = document.querySelector('#submit-notes-btn');
  const idHolder = document.getElementById('article-id-holder');
  const homeBtn = document.getElementById('home-btn');
  const showHideNotes = document.querySelector('.add-notes-container');

  homeBtn.addEventListener('click', function() {
    window.location.assign('/');
  });

  /**
   *
   */
  function hideIfNoteIsShowing() {
    window.addEventListener('click', function(e) {
      const isContainerClicked = e.target === showHideNotes;
      if (isContainerClicked) {
        showHideNotes.classList.remove('show-hide-notes-container');
      }
    });
  }
  hideIfNoteIsShowing();

  submitNotesBtn.addEventListener('click', function() {
    const id = idHolder.innerText;
    console.log(id);
    submitNotes(id);
    showHideNotes.classList.remove('show-hide-notes-container');
  });
  /**
   * this function submit and save
   * @param {Object} articleId
   */
  function submitNotes(articleId) {
    const title = document.getElementById('title-note').value;
    const body = document.getElementById('body-note').value;
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
      showHideNotes.classList.toggle('show-hide-notes-container');
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
