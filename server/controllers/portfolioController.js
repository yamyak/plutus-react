const User = require('../models/userModel');
const Portfolio = require('../models/portfolioModel');

// create portfolio function
createPortfolio = (req, res, next) => {
  // query db to create new portfolio
  Portfolio.create({
    name: req.body.name,
  })
  .then((port) => {
    if(port)
    {
      // if portfolio successfully create, query db to update current user
      // push new portfolio onto queried user
      // return updated user with portfolio objects populated
      User.findOneAndUpdate(
        { _id: req.body.id },
        { $push: { portfolios: port._id } },
        { new: true }
      ).populate('portfolios')
      .then((user) => {
        if(user)
        {
          // clear out password field and return response with user
          user.password = ""
          return res.status(200).json({
            success: true,
            profile: user,
            message: 'Portfolio successfully created'
          });
        }
        else
        {
          // if user does not exist, return an error stating so
          var err = new Error('Current user does not exist');
          err.status = 403;
          next(err);
        }
      })
      .catch((err) => next(err));
    }
    else
    {
      // if portfolio creation fails, return an error stating so
      var err = new Error('Unable to create portfolio ' + req.body.name);
      err.status = 403;
      next(err);
    }
  })
  .catch((err) => next(err));
};

// get portfolio function
getPortfolio = (req, res, next) => {
  // query db to get portfolio based on portfolio id
  Portfolio.findOne({ _id: req.body.id }).populate('stocks')
  .then((port) => {
    if(port === null)
    {
      // if portfolio does not exist, return an error stating so
      var err = new Error('Portfolio with id ' + port._id + ' does not exist!');
      err.status = 403;
      next(err);
    }
    else
    {
      // return response with portfolio
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.json({
        success: true,
        portfolio: port,
        message: 'Portfolio retrieved'
      });
      res.end('Portfolio retrieved!');
    }
  })
  .catch((err) => next(err));
};

module.exports = {
  createPortfolio,
  getPortfolio
};