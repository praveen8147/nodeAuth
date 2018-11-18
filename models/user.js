var mongoose = require('mongoose');
var config = require('../config/database');
var bcrypt = require('bcryptjs');

var userSchema = mongoose.Schema({
	email:{
		type: String,
		require: true,
		unique:true
	},
	password:{
		type: String,
		require: true
	}
})

var User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = function(id, cb) {
	// body...
	User.findById(id,cb);
}

module.exports.getUserByEmail = function(email, cb) {
	// body...
	User.findOne({email:email},cb);
}

module.exports.createUser = function(newUser, cb) {
	// body...
	bcrypt.genSalt(10, function(err, salt){
		bcrypt.hash(newUser.password, salt, function(err, hash){
			if(err) throw err;
			newUser.password = hash; 
			newUser.save(cb)
		});
	})
}

module.exports.comparePassword = function(myPassword, hash, cb) {
	// body...
	console.log("i am in comparePassword");
	bcrypt.compare(myPassword, hash, function(err, isMatch){
		if(err) throw isMatch;
		cb(null, isMatch)
	})
}


