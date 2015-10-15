var express = require('express');
var bodyParser = require('body-parser');
 
var app = express();
var port = process.env.PORT || 3000;

var hellobot = require('./hellobot');
var dicebot = require('./dicebot');
var whosout = require('./whosout');
var whatsup = require('./whatsup');
var stock = require('./stock');

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
 
// test route
app.get('/', function (req, res) { res.status(200).send('Hello world!') });

// Hellobot
app.post('/hello', hellobot);

// Dicebot
app.post('/roll', dicebot);

// Who's Out?
app.post('/whosout', whosout);

// What's up?
app.post('/whatsup', whatsup);

// Stock bot
app.post('/stock', stock);

// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});
 
app.listen(port, function () {
  console.log('Slack bot listening on port ' + port);
});
