'use strict';

(function() {
  const addNotesBtn = document.querySelectorAll('#add-note-btn');
  const deleteArticleBtn = document.querySelectorAll('#delete-article-btn');

  addNotesBtn.forEach((noteBtn) => {
    noteBtn.addEventListener('click', function() {
      console.log('asdfs');
    });
  });

  deleteArticleBtn.forEach((deleteBtn) => {
    deleteBtn.addEventListener('click', function() {
      console.log('fas');
    });
  });
})();
