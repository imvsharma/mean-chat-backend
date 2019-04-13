var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    fullname : {
        type : String,
        unique : false
    },
    email : {
        type : String,
        unique : true,
    },
    password :{
        type : String,
        unique : false
    },
},{timestamps : true});

module.exports = userSchema;