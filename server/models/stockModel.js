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
    },
    industry: {
      type: String,
      required: true
    },
    sector: {
      type: String,
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
    profit: {
      type: Number,
      required: true
    },
    revenue: {
      type: Number,
      required: true
    },
    debt: {
      type: Number,
      required: true
    },
    marketcap: {
      type: Number,
      required: true
    },
    payoutratio: {
      type: Number,
      required: true
    },
    pbratio: {
      type: Number,
      required: true
    },
    currentratio: {
      type: Number,
      required: true
    },
    quickratio: {
      type: Number,
      required: true
    },
    grossmargin: {
      type: Number,
      required: true
    },
    operatingmargin: {
      type: Number,
      required: true
    },
    debttoequity: {
      type: Number,
      required: true
    },
    debtratio: {
      type: Number,
      required: true
    },
    netmargin: {
      type: Number,
      required: true
    },
    receivablesturnover: {
      type: Number,
      required: true
    },
    assetturnover: {
      type: Number,
      required: true
    },
    returnonequity: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Stock', Stock);