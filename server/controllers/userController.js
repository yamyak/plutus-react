const User = require('../models/userModel');
const Portfolio = require('../models/portfolioModel');

// create user function
createUser = (req, res, next) => {
  // query db to see if user account with username provided already exists
  User.findOne({ username: req.body.username })
  .then((user) => {
    if(user)
    {
      // if user exists, return an error stating so
      var err = new Error('User ' + req.body.username + ' already exists!');
      err.status = 403;
      next(err);
    }
    else
    {
      // if user does not exist, create one
      return User.create({
        username: req.body.username,
        password: req.body.password
      });
    }
  })
  .then((user) => {
    // if user successfully created
    if(user)
    {
      // clear out password field and return response with user
      user.password = ""
      return res.status(200).json({
        success: true,
        profile: user,
        message: 'Account successfully created'
      });
    }
    else
    {
      // if user creation fails, return an error stating so
      var err = new Error('Unable to create account ' + req.body.name);
      err.status = 403;
      next(err);
    }
  }, (err) => next(err))
  .catch((err) => next(err));
};

// login/account retrieval function
getProfile = (req, res, next) => {
  // verify that user is not already logged in
  // check that authentication token does not exist in request
  if(!req.session.user)
  {
    // query the db based on username provided
    User.findOne({ username: req.body.username }).populate('portfolios')
    .then((user) => {
      if(user === null)
      {
        // if no matching user found, return an error stating so
        var err = new Error('User ' + username + ' does not exist!');
        err.status = 403;
        next(err);
      }
      else if(user.password !== req.body.password)
      {
        // if password does not match, return an error stating so
        var err = new Error('Your password is incorrect!');
        err.status = 403;
        next(err);
      }
      else if(user.username === req.body.username && user.password === req.body.password)
      {
        // if username and password match, successfully logged in
        // clear out the password field
        user.password = "";
        // set the authentication token
        req.session.user = 'authenticated';
        req.session.save();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');

        // if current profile has portfolios
        if(user.portfolios.length > 0)
        {
          // query the database for the first portfolio in the user account
          Portfolio.findOne({ _id: user.portfolios[0]._id }).populate('stocks')
          .then((port) => {
            if(port !== null)
            {
              // return response with user and portfolio data provided
              res.json({
                success: true,
                profile: user,
                portfolio: port,
                message: 'Logged in'
              });
              res.end('You are now logged in!');
            }
          })
          .catch((err) => next(err));
        }
        else
        {
          // current user profile has not portfolios
          // return response with just the user provided
          res.json({
            success: true,
            profile: user,
            portfolio: null,
            message: 'Logged in'
          });
          res.end('You are now logged in!');
        }   
      }
    })
    .catch((err) => next(err));
  }
  else
  {
    // return error stating that the user is already logged in
    // should never reach this
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.json({
      success: false,
      message: 'Already logged in'
    });
    res.end('You are already logged in!');
  }
};

// logout function
closeProfile = (req, res, next) => {
  // verify that authentication token/session object exists
  if (req.session) 
  {
    // delete the token
    req.session.destroy();
    // clear the frontend cookie
    res.clearCookie('session-id');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.json({
      success: true,
      message: 'Logged out'
    });
    res.end('You are now logged out!');
  }
  else 
  {
    // return error stating that no on is logged in
    // should never reach this
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
};

module.exports = {
  createUser,
  getProfile,
  closeProfile
};