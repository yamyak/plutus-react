const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors')

// set up routers
const userRouter = require('./routes/userRoutes');
const portfolioRouter = require('./routes/portfolioRoutes');
const stockRouter = require('./routes/stockRoutes');

// set up the mongo database connection
const db = require('./db/dbConnect');
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();
// set the backend port number
const apiPort = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
// set up CORS for frontend
app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.json());
app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  cookie: {},
  store: new FileStore()
}));

// provide access to the user account access paths
app.use('/', userRouter);

// authorization function
// checks if user authentication token exists within frontend request
function auth (req, res, next) 
{
  // verify that session token exists in request
  if(!req.session.user) 
  {
    // return error stating that user is not logged in
    var err = new Error('You are not logged in!');
    err.status = 403;
    return next(err);
  }
  else 
  {
    // verify that session token is set properly
    if (req.session.user === 'authenticated') 
    {
      // if set properly, allow access
      next();
    }
    else 
    {
      // if not set properly, return error stating that user is not logged in
      var err = new Error('You are not logged in!');
      err.status = 403;
      return next(err);
    }
  }
}

// apply the authentication function
app.use(auth);

// provide access to the portfolio and stock access paths
app.use('/', portfolioRouter);
app.use('/', stockRouter);

// apply the error handling function
app.use(function (err, req, res, next) {
  // make sure error has a status code
  if(!err.status)
  {
    err.status = 400;
  }
  // return the error message in the result
  res.status(err.status).send({
    success: false,
    error: err.message
  });
});

app.get('/test', function(req, res){
  res.send('Test page');
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));