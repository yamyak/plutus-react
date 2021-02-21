const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// portfolio object contains:
//        name
//        vector of stocks (by id)
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

module.exports = mongoose.model('Portfolio', Portfolio);