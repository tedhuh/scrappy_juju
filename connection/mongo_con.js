// If deployed, use the deployed database.
// Otherwise use the local mongoHeadlines database
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
module.exports = mongoose.Promise = Promise;
mongoose.connect(
  MONGODB_URI,
  {
    useMongoClient: true,
  }
);
