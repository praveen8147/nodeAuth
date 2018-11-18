var passport = require('passport');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var config = require('../config/database');
module.exports = function(app, passport) {
	// body...
	app.get('/', function(req, res){
		res.json('Welcome to node auth app..')
	})

	app.post('/signup', function(req, res){
		var newUser = new User({
			email: req.body.email,
			password: req.body.password
		})

		User.createUser(newUser, function(err, user){
			if(err){
				res.json({success:false, message:'user not registered successfully'})
			}else{
				res.json({success:true, message:'user registered successfully'})
			}
		})
	})

	app.post('/login', function(req, res){
		console.log("hey i am here");
		var email = req.body.email;
		var password = req.body.password;
		User.getUserByEmail(email, function(err, user){
			if(err) throw err;
			if(!user){
				return res.json({success: false, message: "user not found!.."})
			}
			if(email !== user.email){
				return res.json({success: false, message: "user not found"})
			}
			User.comparePassword(password, user.password, function(err, isMatch){
				if(err) throw err;	
				if(isMatch){
					var token = jwt.sign({user}, config.secret,{expiresIn:600000});
					res.json({success:true, token:'JWT'+token, user:{
						id: user._id,
						email: user.email, 
						password: user.password
					}})
				}else{
					return res.json({success:false, message:"password went wrong for above entered user"})
				}
			})
		})
	})

	app.get('/profile', passport.authenticate('jwt',{session:false}), function(){
		res.json({user:req.user}); 
	})

	app.get('/logout', function(req,res){
		req.logout();
		res.redirect('/'); 
	})
}