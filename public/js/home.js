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
      .catch((err) => console.log(err));
  });

  /**
   * this function appends the data into the html
   * @param {Object} res
   */
  function appendData(res) {
    console.log(res);
    const articleContainer = document.getElementById('article-container');
    res.forEach((data) => {
      articleContainer.innerHTML += `
      <h3>${data.title}</h3>
      <h4><a href="${data.link}">link</a></h4>
      <p>${data.summary}</p>`;
    });
  }
})();
