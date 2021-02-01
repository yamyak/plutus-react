const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors')

const userRouter = require('./routes/userRoutes');

const db = require('./db/dbConnect');
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();
const apiPort = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));

app.use('/', userRouter);

function auth (req, res, next) 
{
  if(!req.session.user) 
  {
    var err = new Error('You are not logged in!');
    err.status = 403;
    return next(err);
  }
  else 
  {
    if (req.session.user === 'authenticated') 
    {
      next();
    }
    else 
    {
      var err = new Error('You are not logged in!');
      err.status = 403;
      return next(err);
    }
  }
}

app.use(auth);

app.use(function (err, req, res, next) {
  if(!err.status)
  {
    err.status = 400;
  }
  res.status(err.status).send({error: err.message});
});

app.get('/test', function(req, res){
  res.send("Test page");
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));