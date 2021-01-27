const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db/dbConnect');
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const router = require('./routes/routes');

const app = express();
const apiPort = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use('/', router);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));