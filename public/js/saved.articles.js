'use strict';

(function() {
  const addNotesBtn = document.querySelectorAll('#add-note-btn');
  const deleteArticleBtn = document.querySelectorAll('#delete-article-btn');
  const submitNotesBtn = document.querySelector('#submit-notes-btn');
  const idHolder = document.getElementById('article-id-holder');
  const homeBtn = document.getElementById('home-btn');
  const showHideNotes = document.querySelector('.add-notes-container');
  const hideShowNoteBtn = document.querySelectorAll('#hide-show-note-btn');
  const addNotesContainer = document.querySelector('.add-notes-container');
  const hideShowArticleBtn = document.querySelectorAll(
    '#hide-show-article-btn'
  );

  hideShowNoteBtn.forEach((noteBtn) => {
    noteBtn.addEventListener('click', function() {
      const theParents = this.parentNode;
      theParents.style.width = '0';
      theParents.previousElementSibling.style.width = '100%';
    });
  });

  hideShowArticleBtn.forEach((articleBtn) => {
    articleBtn.addEventListener('click', function() {
      const theParents = this.parentNode.parentNode;
      theParents.style.width = '0%';
      theParents.parentNode.childNodes[3].style.width = '100%';
    });
  });

  homeBtn.addEventListener('click', function() {
    window.location.assign('/');
  });

  /**
   * this function hides the container of its click outside the form;
   */
  function hideIfNoteIsShowing() {
    window.addEventListener('click', function(e) {
      const isContainerClicked = e.target === showHideNotes;
      if (isContainerClicked) {
        addNotesContainer.style.position = 'absolute';
        showHideNotes.classList.remove('show-hide-notes-container');
      }
    });
  }
  hideIfNoteIsShowing();

  submitNotesBtn.addEventListener('click', function() {
    const id = idHolder.innerText;
    submitNotes(id);
    showHideNotes.classList.remove('show-hide-notes-container');
    window.location.reload();
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
      addNotesContainer.style.position = 'fixed';
      // TODO: create a modal to show and add notes
      const id = this.parentNode.parentNode.dataset.articleid;
      idHolder.innerText = id;
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
   * this function deletes a article
   * @param {Object} article
   */
  function deleteArticle(article) {
    const id = article.dataset.articleid;
    const elemContainer = document.getElementById(`${id}`).parentNode;
    article.parentNode.parentNode.removeChild(elemContainer);
    const url = `/delete/article/${id}`;
    fetch(url, {
      method: 'DELETE',
    })
      .then((respond) => respond.json())
      .then((result) => {
        console.log(result);
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  }
})();
