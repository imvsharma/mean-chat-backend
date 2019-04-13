var express = require('express');
var log = require('morgan')('dev');
var bodyParser = require('body-parser');

 var config = require('./config/properties');
var db = require('./config/database');
var Userroutes = require('./api/user/user.routes');
var port = config.port;
var app = express();

var bodyParserJSON = bodyParser.json();
var bodyParserURLEncoded = bodyParser.urlencoded({extended:true});
var router = express.Router();
db();

app.use(log);
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

app.use(function(req, res, next) {
   res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
  next();
});

app.use('/api',router);

Userroutes(router);

app.listen(port, function(request, response){
    console.log("Server is running on "+ port + " port");
});