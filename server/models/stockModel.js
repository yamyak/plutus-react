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
    price: {
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