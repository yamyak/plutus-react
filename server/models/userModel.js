const mongoose = require('mongoose');

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
      required: true
    },
    portfolios: [{ 
      type: Schema.Types.ObjectId,
      ref: 'Portfolio'
    }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', User);