const mongoose = require('mongoose')

const url = 'mongodb://127.0.0.1:27017/plutus';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
.then((db) => {
  console.log('Connected to plutus database');
})
.catch((err) => {
  console.error('Connection error', err.message)
});

const database = mongoose.connection;

module.exports = database;