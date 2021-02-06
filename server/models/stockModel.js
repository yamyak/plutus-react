const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Stock = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    ticker: {
      type: String,
      required: true
    },
    Industry: {
      type: String,
      required: true
    },
    Sector: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      min: 0,
      required: true
    },
    peratio: {
      type: Number,
      min: 0,
      required: true
    },
    dividend: {
      type: Number,
      min: 0,
      required: true
    },
    score: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = Stock;