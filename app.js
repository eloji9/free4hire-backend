require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const cors         = require('cors');
const session      = require('express-session');
const MongoStore   = require('connect-mongo')(session);


const passportSetup = require('./passport/setup.js');

mongoose.Promise = Promise;
mongoose
  .connect(process.env.MONGODB_URI, {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Allow cross-origin ressource sharing (API requests from other domains)
app.use(cors({
  // receives cookies from other domains
  credentials:true,
  // there are the domains I want cookies from
  origin:["http://localhost:4200"]
}));

// Session setup should come after the CORS setup
app.use(session({
  secret: "blah blah blah",
  saveUninitialized: true,
  resave: true,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

// passportSetup always after SESSION setup
passportSetup(app);

const authRouter = require ('./routes/auth-router.js');
app.use('/api', authRouter);

// const missionRouter = require('./routes/mission-router.js');
// app.use('/api', missionRouter);

app.use((req,res,next) => {
  res.sendFile(`${__dirname}/public/index.html`)
});

module.exports = app;
