const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const xpshbs = require('express-handlebars');
const morgan = require('morgan');

// ! REQUIRE ROUTES HERE =========================
const articles = require('./routes/articles.route');
const scrape = require('./routes/scrape.routes');
const notes = require('./routes/notes.routes');
const home = require('./routes/home.route');
// ! REQUIRE ROUTES HERE =========================

const app = express();
const PORT = process.env.PORT || 3000;

// ! middleware start ============================

// ! body-parser for parsing incoming data
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// ! serves static files
app.use(express.static('public'));
// ! morgan logs status request
app.use(morgan('dev'));
// ! handlebars
// Handlebars
app.engine(
  'handlebars',
  xpshbs({
    extname: 'handlebars',
    defaultLayout: 'index',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/',
  })
);
app.set('view engine', 'handlebars');

// ! middleware end ============================

// ! mongodb connection using mongoose
mongoose.connect('mongodb://localhost/scrappy');

// ! ROUTES START HERE =======================
app.use(articles);
app.use(scrape);
app.use(notes);
app.use(home);
// ! ROUTES END HERE ==========================

app.listen(PORT, () => {
  console.log(`PORT: ${PORT}`);
});
