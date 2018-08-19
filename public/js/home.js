'use strict';

(function() {
  const scrapeBtn = document.getElementById('scrape-btn');

  scrapeBtn.addEventListener('click', () => {
    fetch({
      method: 'get',
      url: '/scrape'
    })
      .then(data => {
        console.log(data);
      })
      .catch(err => console.log(err));
  });
})();
