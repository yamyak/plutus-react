const User = require('../models/userModel');
const Portfolio = require('../models/portfolioModel');

createPortfolio = (req, res, next) => {
  Portfolio.create({
    name: req.body.name,
  })
  .then((port) => {
    if(port)
    {
      User.findOneAndUpdate(
        { _id: req.body.id },
        { $push: { portfolios: port._id } },
        { new: true }
      ).populate('portfolios')
      .then((user) => {
        if(user)
        {
          user.password = ""
          return res.status(200).json({
            success: true,
            data: user,
            message: 'Portfolio successfully created'
          });
        }
        else
        {
          var err = new Error('Current user does not exist');
          err.status = 403;
          next(err);
        }
      })
      .catch((err) => next(err));
    }
    else
    {
      var err = new Error('Unable to create portfolio ' + req.body.name);
      err.status = 403;
      next(err);
    }
  })
  .catch((err) => next(err));
};

module.exports = {
  createPortfolio
};