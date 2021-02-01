const mongoose = require('mongoose');
const Portfolio = require('./portfolioModel');

const Schema = mongoose.Schema;

const User = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      require: true
    },
    portfolios: [ Portfolio ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', User);