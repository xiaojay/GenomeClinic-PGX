/* General desintation routes. This is called last when 
 * adding route information. these reoutes essentially
 * are what is handling serving page content to the browser.
 * @author Ron Ammar
 * @author Patrick Magee
 */
var Promise = require('bluebird');
var constants = require('../lib/conf/constants.json');
var utils = require('../lib/utils');

var dbConstants = constants.dbConstants,
	nodeConstants = constants.nodeConstants;

module.exports = function(app,dbFunctions){
	var configured;
	if (!dbFunctions)
		dbFunctions = require("../models/mongodb_functions");
	//==================================================================
	//Route to the home page, or the config page if it is not set
	//==================================================================
	app.get("/", utils.isLoggedIn, function(req, res) {
		/* Check if the server has already been configured. 
		 * Using a bit of promise voodoo to ensure we check the DB first, but only
		* when configured !== true, so as to reduce DB interactions. */	
		var promise= new Promise.resolve(configured);
		if (!configured) {
			promise= dbFunctions.isConfigured();
		}

		/* If server is not configured redirect to the config page. Use a boolean
		 * instead of checking the DB with each request. */
		promise.then(function(resolved_config) {
			if (resolved_config) {
				if (!configured) {
					configured= resolved_config;
				}
				utils.render(req,res);
			} else {
				res.redirect('/config');
			}
		});
	});


	//==================================================================
	//config form
	//==================================================================
	app.get("/config", utils.isLoggedIn, function(req,res){
		var promise = new Promise.resolve(configured);
		if (! configured) {
			promise = dbFunctions.isConfigured();
		}
		promise.then(function(resolved_config){
			if (resolved_config){
				if(!configured)
					configured = resolved_config;
				res.redirect('/');
			} else {
				utils.render(req,res);
			}
		});
	});

	app.post("/config", utils.isLoggedIn, function(req,res){
		var configSettings= req.body;
		dbFunctions.update(dbConstants.DB.ADMIN_COLLECTION, {}, {$set: configSettings})
		.then(function(result){
			dbFunctions.isConfigured(true);
		}).then(function(result){
			res.send(JSON.stringify(true));
		});
	});

	//==================================================================
	//Generic page routers
	//==================================================================

	//new projects
	app.get('/projects', utils.isLoggedIn, function(req,res){
		utils.render(req,res);
	});
	//statusPage routes
	app.get('/statuspage',utils.isLoggedIn,function(req,res){
		utils.render(req,res);
	});

	//browse all patients and serve patient page
	app.get('/browsepatients',utils.isLoggedIn,function(req,res){
		utils.render(req,res);
	});


	//==================================================================
	//Handle 404 routes
	//==================================================================
	/* NOTE: This must always be the ABSOLUTE last route added,
	 * Otherwise It will redirect a legitimate route to the 404 page.
	 * Essentially its sayin, anything coming in will be sent to 404notfound
	 */
	app.get('*', function(req,res){
		utils.render(req,res);
	});
};




