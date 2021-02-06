const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Portfolio = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    stocks: [{ 
      type: Schema.Types.ObjectId,
      ref: 'Stock'
    }]
  },
  {
    timestamps: true
  }
);

module.exports = Portfolio;