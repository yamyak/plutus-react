const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Stock = new Schema(
  {
    name: {
      type: String,
    },
    ticker: {
      type: String,
      required: true
    },
    Industry: {
      type: String,
    },
    Sector: {
      type: String,
    },
    price: {
      type: Number,
      min: 0,
    },
    peratio: {
      type: Number,
      min: 0,
    },
    dividend: {
      type: Number,
      min: 0,
    },
    score: {
      type: Number,
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Stock', Stock);