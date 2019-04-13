var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var userSchema = require('./user.model');

userSchema.statics = {

hashpassword : function(password, cb){
                    bcrypt.genSalt(10, function(err,salt){
                            if(err){
                                return cb(err);
                            }
        
                        bcrypt.hash(password,salt,function(err, hashPassword){
                                if(err){
                                    return cb(err);   
                                }   
                                return cb(null,hashPassword);
                        })
            
                    });
        
                },


comparePassword :   function(password,hashedPassword,cb){
                        bcrypt.compare(password, hashedPassword, function(err, isMatch){
                            if(err){
                                return cb(err);
                            }
                            return cb(null, isMatch);
            
                        })
                    },

create : function(data, cb){
                var user = new this(data);
                    user.save(cb);
        },

getByEmail : function(query, cb){
                this.findOne(query,cb);
            },

getById : function(query, cb){
                this.findById(query, cb);
        },

update : function(query, updateData, cb){
                this.findOneAndUpdate(query,{$set : updateData},{new : true}, cb)
        }


}

var userModel = mongoose.model('User',userSchema);

module.exports = userModel;