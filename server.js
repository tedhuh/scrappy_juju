const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const xpshbs = require('express-handlebars');
const morgan = require('morgan');

// ! REQUIRE ROUTES HERE =========================
const testRoute = require('./routes/scrape.routes');
const home = require('./routes/home.route');
// ! REQUIRE ROUTES HERE =========================

const app = express();
const PORT = process.env.PORT || 3000;

// ! middleware start ============================

// ! serves static files
app.use(express.static('public'));
// ! morgan logs status request
app.use(morgan('dev'));
// ! body-parser for parsing incoming data
app.use(bodyParser.urlencoded({extended: true}));
// ! handlebars
// Handlebars
app.engine(
  'handlebars',
  xpshbs({
    defaultLayout: 'index',
  })
);
app.set('view engine', 'handlebars');

// ! middleware end ============================

// ! mongodb connection using mongoose
mongoose.connect('mongodb://localhost/scrappy');

// ! ROUTES START HERE =======================
app.use(home);

app.use(testRoute);
// ! ROUTES END HERE ==========================

app.listen(PORT, () => {
  console.log(`PORT: ${PORT}`);
});
