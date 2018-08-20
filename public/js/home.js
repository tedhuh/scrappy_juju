'use strict';

(function() {
  const scrapeBtn = document.getElementById('scrape-btn');
  const url = '/scrape';
  scrapeBtn.addEventListener('click', () => {
    fetch(url, {
      method: 'GET',
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
    res.forEach((article) => {
      articleContainer.innerHTML += `
      <div> 
      <h3 id="article-title">${article.title}</h3>
      <h4><a href="${article.link}" id="article-title">link</a></h4>
      <p id="article-summary">${article.summary}</p>
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
        saveArticleInDb(this.parentNode);
        console.log('saved!!');
      });
    });
  }

  /**
   * this funciton save data from the DB
   * @param {HTMLCollection} elem
   */
  function saveArticleInDb(elem) {
    const title = elem.querySelector('#article-title').innerText;
    const link = elem.querySelector('a').getAttribute('href');
    const summary = elem.querySelector('#article-summary').innerText;
    const url = '/save/article';
    const data = {
      title,
      link,
      summary,
    };
    console.log(data);
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => data.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
})();
