'use strict';

(function() {
  const scrapeBtn = document.getElementById('scrape-btn');
  const url = '/scrape';
  scrapeBtn.addEventListener('click', () => {
    fetch(url, {
      method: 'get',
    })
      .then((data) => data.json())
      .then((res) => appendData(res))
      .then((res) => {
        addEventClickOnSaveBtn();
      })
      .catch((err) => console.log(err));
  });

  /**
   * this function appends the data into the html
   * @param {Object} res
   */
  function appendData(res) {
    const articleContainer = document.getElementById('article-container');
    res.forEach((data) => {
      articleContainer.innerHTML += `
      <div> 
      <h3>${data.title}</h3>
      <h4><a href="${data.link}">link</a></h4>
      <p>${data.summary}</p>
      <button id="save-article-btn">SAVE ARTICLE</button>
      </div>`;
    });
  }

  /**
   * this function addsEvent listener on save
   * btn after the scrapping is done
   */
  function addEventClickOnSaveBtn() {
    const saveArticleBtn = document.querySelectorAll('#save-article-btn');
    saveArticleBtn.forEach((elem) => {
      elem.addEventListener('click', function() {
        saveArticleInDb(this);
        console.log('saved!!');
      });
    });
  }

  /**
   * this funciton save data from the DB
   * @param {Object} elem
   */
  function saveArticleInDb(elem) {
    console.log(elem, 'elem');
    const url = '/save/article';
    fetch(url, {
      method: 'post',
      body: {
        test: {foo: 'bar'},
      },
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/json; charset=utf-8',
        // "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((data) => data.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
})();
