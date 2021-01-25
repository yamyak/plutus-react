const mongoose = require('mongoose');
const Stock = require('./stockModel');

const Schema = mongoose.Schema;

const Portfolio = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    stocks: [ Stock ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Portfolio', Portfolio);