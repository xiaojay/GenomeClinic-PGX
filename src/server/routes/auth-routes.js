/* Routes module to add Authorization and login routes to
 * the express app. These routes handle loggin in to the app.
 * This module requires that the express app is already configured
 * to use passport
 * @author Patrick Magee
 */
var Promise= require("bluebird");
var nodemailer = require('nodemailer');
var constants = require("../lib/conf/constants.json");
var utils = require('../lib/utils');

var nodeConstant = constants.nodeConstants,
	dbConstants = constants.dbConstants;

module.exports = function(app,logger,opts,passport){
	utils.dbFunctions = app.dbFunctions;
	//==================================================================
	//initialize the transporter for sending mail via gmail
	//==================================================================
	if (opts.gmail && opts.password){
		var transporter = nodemailer.createTransport({
			service:'gmail',
			auth:{
				user: opts.gmail, // this must be set up a new each time.
				pass: opts.password
			}
		});
	}

	//==================================================================
	//Check which Auth is set and send object back
	//==================================================================
	app.get('/auth/check',function(req,res){
		var data = {
			signup:opts.signup,
			recover:opts.recover,
			oauth:opts.oauth,
			login:true
		};
		res.send(data);
	});

	app.get('/auth/user',function(req,res){
		var data ={};
		if (req.user)
			data.user = req.user[dbConstants.USERS.ID_FIELD];
		else
			data.user = undefined;
		res.send(data);
	});

	//==================================================================
	//LOGIN Request
	//==================================================================
	app.get('/login',function(req,res){
		if(req.isAuthenticated())
			res.redirect('/');
		else 
			utils.render(req,res,{loginT:true,signup:opts.signup,recover:opts.recover,oauth:opts.oauth,login:true,scripts:'authentication.js'});
	});
	//urlencodedParser
	app.post('/login',passport.authenticate('local-login',{
		successRedirect:'/success',
		failureRedirect:'/failure',
		failureFlash:true
	}));

	//==================================================================
	//SIGNUP Request if flag true
	//==================================================================
	if (opts.signup){
		logger('Info','Using account signup');
		app.get('/signup',function(req,res){
			if (req.isAuthenticated())
				res.redirect('/');
			else
				utils.render(req,res,{signupT:true,signup:opts.signup,recover:opts.recover,oauth:opts.oauth,login:true,scripts:'authentication.js'});
		});
		//urlencodedParser
		//parse signup information
		app.post('/signup',passport.authenticate('local-signup',{
			successRedirect:'/success',
			failureRedirect:'/failure',
			failureFlash:true
		}));

	}
	
	//===============================================================
	// Add recover Password if Flag true
	//==================================================================
	if (opts.recover) {	
		logger('info','Using account recovery');
		app.get('/recover', function(req,res){
			if (req.isAuthenticated())
				res.redirect('/');
			else
				utils.render(req,res,{recoverT:true,signup:opts.signup,recover:opts.recover,oauth:opts.oauth,login:true,scripts:'authentication.js'});
		});

		app.post('/recover',function(req,res){
			var body = req.body;
			//check if user is valid
			app.dbFunctions.findUserById(body[dbConstants.USERS.ID_FIELD])
			.then(function(user){
				if (user) {
					if (user[dbConstants.USERS.GOOGLE.ID_FIELD]){
						req.flash('error','Oops that username appears to be linked to a Google account. Please sign in to Google to change your password');
						req.flash('statusCode','400');
						res.redirect('/failure');
					} else {
						app.dbFunctions.generatePassword(body[dbConstants.USERS.ID_FIELD])
						.then(function(result){
							var mailOptions = {
								from:'patrickmageee@gmail.com',
								to:body[dbConstants.USERS.ID_FIELD],
								subject:'password reset',
								html:'<h4>Password Reset<h4><p>Your temporary password is: ' + result + '</p><br><p>Please login and change your password</p><br><p><b>Do not reply to this email</b></p>',
							};
							transporter.sendMail(mailOptions,function(err,info){
								if (err){
									console.log(err);
								}else {
									req.flash('statusCode','200');
									res.redirect('/success');
								}
							});
						});
					}

				} else {
					req.flash('error','Oops, No user was found!');
					req.flash('statusCode','404');
					res.redirect('/failure');
				}
			});

		});
	}

	//Route to render a user's password
	app.get('/setpassword',utils.isLoggedIn, function(req,res){
		utils.render(req,res,{'set-passwordT':true,signup:opts.signup,recover:opts.recover,oauth:opts.oauth,login:true,scripts:'authentication.js'});
	});

	//Route to verify and update a users password 
	app.post('/setpassword',utils.isLoggedIn,function(req,res){
		var data = req.body;
		var username = req.user[dbConstants.USERS.ID_FIELD].toString();
		if (req.user.hasOwnProperty(dbConstants.USERS.GOOGLE.ID_FIELD)){
			req.flash('error','Oops, You appear to be signed in with a Google account, you must log into google to change your password!');
			req.flash('statusCode','400');
			res.redirect('/failure');
		} else {
			app.dbFunctions.findUserById(username).then(function(user){
				if (user){
					app.dbFunctions.validatePassword(username,data[dbConstants.USERS.PASSWORD_FIELD].toString()).then(function(result){
						if (result){
							app.dbFunctions.changePassword(username, data.newpassword.toString()).then(function(){
								req.flash('alert',true);
								req.flash('message',"Password changed successfully");
								req.flash('statusCode','200');
								res.redirect('/success');
							});
						} else {
							logger('info','failed attempt to change password for user ' + username, {user:username,action:'changePassword'});
							req.flash('error','Oops incorrect password!');
							req.flash('statusCode','400');
							res.redirect('/failure');
						}
					});
				} else {
					req.flash('error','Oops User not found');
					req.redirect('/failure');
				}
			});
		}
	});

	//==================================================================
	//LOGIN WITH GOOGLE Request if flag set true
	//==================================================================
	if (opts.oauth){
		logger.info('Using Google OAUTH authentication');
		app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

	//==================================================================
	//RESPONSE FROM GOOGLE Request
	//==================================================================
	    app.get('/auth/google/callback',
	        passport.authenticate('google', {
	            successRedirect : '/',
	            failureRedirect : '/login'
	       	})
	    );
	}

	//==================================================================
	//Logout
	//==================================================================
	app.get('/logout', function(req,res){
		req.logout();
		res.redirect('/');
	});



	
	//==================================================================
	//check to see whether or not the user is authenticated yet
	//==================================================================	
	app.get('/authenticated', function(req,res){
		if (req.isAuthenticated()){
			res.send(JSON.stringify(true));
		} else {
			res.send(JSON.stringify(undefined));
		}
	});
};