const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();

dotenv.config();

// connect database
mongoose.connect( process.env.DB_CONNECT, 
  {useNewUrlParser: true},
  () => console.log('connected to the database'));

mongoose.Promise = global.Promise;

// cors middleware
app.use(cors());

// static url
app.use('/', express.static('public'));

// body parser middeware
app.use(bodyParser.json());

app.use(function(err, req, res, next){
  res.status(422).send({error: err.message});
});

// routes
app.use('/api/records', require('./routes/records'));

const PORT = process.env.port || 8000;

app.listen(PORT, () => console.log('server started ' + PORT));