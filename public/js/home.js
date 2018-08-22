'use strict';

(function() {
  const goToSavedArticleBtn = document.getElementById('saved-articles');
  goToSavedArticleBtn.addEventListener('click', function() {
    window.location.assign('/get/articles');
  });

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
      <div class="article-wrapper"> 
        <h3 id="article-title" class="title">${article.title}</h3>
          <h4 class="link link-container">
            <a href="${article.link}" id="article-title" target="_blank">
                LINK
            </a>
          </h4>
        <p id="article-summary" class="summary">${article.summary}</p>
        <button id="save-article-btn" class="save-btn">SAVE ARTICLE</button>
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
   * @param {HTMLCollection} elem takes HTML element
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
