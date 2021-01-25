const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./data/dbConnect');

db.on('error', console.error.bind(console, 'MongoDB connection error:'))