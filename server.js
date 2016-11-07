var application_root = __dirname;
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

app.use(express.static(path.join(application_root, 'dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(path.join(application_root, 'dist', 'index.html'));
});

//Start server
var port = 8000;

app.listen(port, function() {
  console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});
