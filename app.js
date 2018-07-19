require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const cookieParser = require('cors');


mongoose.Promise = Promise;
mongoose
  .connect('mongodb://localhost/free4hire-backend', {useMongoClient: true})
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

app.use(cors({
  credentials: true,
  origin: ["http://localhost:4200"]
}))

const missionRouter = require('./routes/mission-router.js');
app.use('/api', missionRouter);

const clientRouter = require('./routes/client-router.js');
app.use('/api', clientRouter);

const workerRouter = require('./routes/worker-router.js');
app.use('/api', workerRouter);

module.exports = app;
