var MongoClient= require("mongodb").MongoClient;
var Promise = require("bluebird");
var dbConstants = require("../conf/constants.json").dbConstants;
var nodeConstants = require('../conf/constants.json').nodeConstants;
var bcrypt = require("bcrypt-nodejs");

function createDBConnection () {
	var dbConnection;
	this.ops; // operations once db is loaded
	//Return promise
	var _this = this;
	this.connect= function(user,pwd) {
		// if DB exists and is open/closed, refresh/open the connection pool
		if (dbConnection) {
			dbConnection.open();
			return null;
		}
			
		dbURL= "mongodb://";
		if (user && pwd)
			dbURL += user + ":" + pwd + "@";

		else if (dbConstants.DB.AUTH_USER !== null && dbConstants.DB.AUTH_PASSWD !== null)
			dbURL += dbConstants.DB.AUTH_USER + ":" + dbConstants.DB.AUTH_PASSWD + "@";

		dbURL += dbConstants.DB.HOST + ":" + dbConstants.DB.PORT + "/" + dbConstants.DB.NAME;

		var promise= new Promise(function(resolve, reject) {
			MongoClient.connect(dbURL, function(err, DB) {
				if (err) {
					reject(err);
				}
				//logger("info","Connected to mongoDatabase",{target:dbURL,action:'connect'});
				dbConnection = DB;
				_this.ops = new
				resolve(true);
			});
		});
		return promise;
	};

	this.getDB = function(){
		return dbConnection
	}
}

createDBConnection.prototype.close = function(cb){
	if (this.getDB()) this.getDB().close(cb);
};


//db = new createDBConnection();

module.exports = createDBConnection;