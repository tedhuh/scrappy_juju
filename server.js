const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const xpshbs = require('express-handlebars');
const morgan = require('morgan');

// ! Used for scrapping
const axios = require('axios');
const cheerio = require('cheerio');

// ! REQUIRE ROUTES HERE =========================
const testRoute = require('./routes/scrape.routes');
// ! REQUIRE ROUTES HERE =========================

const app = express();
const PORT = process.env.PORT || 3000;

// ! middleware start ============================

// ! morgan logs status request
app.use(morgan('dev'));
// ! body-parser for parsing incoming data
app.use(bodyParser.urlencoded({ extended: true }));
// ! handlebars
// Handlebars
app.engine(
  'handlebars',
  xpshbs({
    defaultLayout: 'index'
  })
);
app.set('view engine', 'handlebars');

// ! middleware end ============================

// ! mongodb connection using moogose
mongoose.connect('mongodb://localhost/scrappy');

// ! ROUTES START HERE =======================
app.get('/', (req, res) => {
  res.json('test');
});

app.use(testRoute);
// ! ROUTES END HERE ==========================

app.listen(PORT, () => {
  console.log(`PORT: ${PORT}`);
});
