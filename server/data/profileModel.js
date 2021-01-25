const mongoose = require('mongoose');
const Portfolio = require('./portfolioModel');

const Schema = mongoose.Schema;

const Profile = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    portfolios: [ Portfolio ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Profile', Profile);