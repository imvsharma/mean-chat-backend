//var express = require('express');
//var router = express.Router();
var User = require('./user.controller');

module.exports = function(router){
    router.post('/signup',User.signup);
    router.post('/login',User.login);
}