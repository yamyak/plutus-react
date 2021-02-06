const User = require('../models/userModel');

createUser = (req, res, next) => {
  User.findOne({ username: req.body.username })
  .then((user) => {
    if(user)
    {
      var err = new Error('User ' + req.body.username + ' already exists!');
      err.status = 403;
      next(err);
    }
    else
    {
      return User.create({
        username: req.body.username,
        password: req.body.password
      });
    }
  })
  .then((user) => {
    if(user)
    {
      user.password = ""
      return res.status(200).json({
        success: true,
        data: user,
        message: 'Account successfully created'
      });
    }
  }, (err) => next(err))
  .catch((err) => next(err));
};

getProfile = (req, res, next) => {
  if(!req.session.user)
  {
    /*
    var authHeader = req.headers.authorization;
    
    if (!authHeader) {
      var err = new Error('Username and password needed to log in!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      return next(err);
    }

    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var username = auth[0];
    var password = auth[1];
    */

    User.findOne({ username: req.body.username })
    .then((user) => {
      if(user === null)
      {
        var err = new Error('User ' + username + ' does not exist!');
        err.status = 403;
        next(err);
      }
      else if(user.password !== req.body.password)
      {
        var err = new Error('Your password is incorrect!');
        err.status = 403;
        next(err);
      }
      else if(user.username === req.body.username && user.password === req.body.password)
      {
        console.log("got in");
        user.password = "";
        req.session.user = 'authenticated';
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.json({
          success: true,
          data: user,
          message: 'Logged in'
        });
        console.log(req);
        res.end('You are now logged in!')
      }
    })
    .catch((err) => next(err));
  }
  else
  {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.json({
      success: false,
      message: 'Already logged in'
    });
    res.end('You are already logged in!');
  }
};

closeProfile = (req, res, next) => {
  if (req.session) 
  {
    req.session.destroy();
    res.clearCookie('session-id');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.json({
      success: true,
      message: 'Logged out'
    });
    res.end('You are now logged out!')
  }
  else 
  {
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