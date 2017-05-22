// importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

const route = require('./routes/route');

// connect mongodb
mongoose.connect('mongodb://localhost:27017/contactlist');

mongoose.connection.on('connected', () => {
    console.log('connected..........!');
});

mongoose.connection.on('error', (err) => {
    if (err) {
        console.log(err);
    }
    console.log('connected..........!');
});

//port no
const port = 3000;

// adding middleware -cors
app.use(cors());

// body-parser
app.use(bodyparser.json());

// static files
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/api', route);

// testing 
app.get('/', (req, res) => {
    res.send('foobar');
});

app.listen(port, () => {
    console.log('server started at port' + port);
});