/* A simple queuing system that allows for serial execution of 
 * the annovar annotations and insertion into the database.
 * Will accept additional files to be added to a queue however,
 * hold off performing any action on them, until the one ahead
 * of it is completed.
 * 
 * written by Patrick Magee
 */
var Promise = require('bluebird');
var nodeConstant= require("./node_constants"); 
var annotateFile = require('./annotateAndAddVariants');
var fs = Promise.promisifyAll(require('fs'));
var dbFunctions = require('./mongodb_functions');



function queue(logger,dbFunctions){
	this.logger = logger;


	
}

//=======================================================================================
//variables
queue.prototype.isRunning = false;
queue.prototype.queue = [];

/* Add the incoming file with patientInformation to the queue
 * to await processing additionally, when it adds a file to the queue.
 * it also adds the patient name to the patient table ensuring no
 * duplicate entries occur
 */
queue.prototype.addToQueue = function(fileParams, patientFields,user){
	var self = this
	var promise = new Promise(function(resolve,reject){
		var inputObj = {
			fileInfo: fileParams,
		};
		var tempArr =[]
		self.splitInputFields(patientFields)
		.each(function(patient){
			self.logger.info(fileParams.name + "added to queue");
			var options = patient;
			var now = new Date();
			options['patient_id'];
			options['file'] = fileParams.name;
			options['added'] = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
			options['ready'] = false;
			options['completed'] = undefined;
			options['owner'] = user;
			tempArr.push(options);
		}).then(function(){
			inputObj['fields'] = tempArr;
			self.queue.push(inputObj);
		}).then(function(){
			resolve(self.queue);
		});

	});
	return promise;
};

//=======================================================================================
/* remove the first item from the queue */
queue.prototype.removeFirst = function(){
	var self = this
	var promise = new Promise(function(resolve,reject){
		self.queue.shift();
		resolve(self.queue);
	});
	return promise;
}

//=======================================================================================
/* Grab the first entry from the queue and return the object */
queue.prototype.first = function(){
	var self = this;
	var promise = new Promise(function(resolve,reject){
		var outObj = self.queue[0];
		resolve(outObj);
	});
	return promise;
}

//=======================================================================================

/* the input fields on multi-patient forms start with an identified
 * ie. 0- or 1-  linking the incoming field with the patient
 * This appeard to be a limitation to the file-upload form query
 * So this will split the fields and determine which patient goes with what
 */
queue.prototype.splitInputFields = function(fields){
	var self = this;
	var promise = new Promise(function(resolve,reject){
		var tempObj = {};
		var outList = [];

		for (field in fields){
			if (fields.hasOwnProperty(field)){
				var splitFields = field.split('-');
				if (!tempObj.hasOwnProperty(splitFields[0]))
					tempObj[splitFields[0]] = {};
				tempObj[splitFields[0]][splitFields[1]] = fields[field];
			}
		}
		for (num in tempObj){
			if (tempObj.hasOwnProperty(num)){
				outList.push(tempObj[num]);
			}
		}
		resolve(outList);
	})
	return promise;
}

//=======================================================================================
/* Annotate the first file in the queue and add the contained patients
 * to the databse (possibly think of handing this off to the annotateAndAddvariants script)
 */
queue.prototype.run = function(){
	var self = this;
	var fileInfo;
	var fields;
	//var promise = new Promise(function(resolve,reject){
	if (!self.isRunning)
		self.isRunning = true;

	self.first().then(function(params){
		fileInfo = params.fileInfo;
		fields = params.fields;
	}).then(function(){
		self.removeFirst();
	}).then(function(){
		return fields;
	}).each(function(options){
		return dbFunctions.addPatient(options);
	}).then(function(result){
		var options = {
			input:'upload/vcf/' + fileInfo.name,
			patients:result
		};
		self.logger.info('running annotations on ' + options.input);
		return annotateFile(options);
	}).then(function(){
		self.logger.info('annotations complete');
		if (self.queue.length > 0){
			return self.run();
		} else {
			self.isRunning = false;
		}
	}).catch(function(err){
		self.logger.error(err.stack);
		self.isRunning = false;
	});
		// do somehting here;
}


module.exports = queue;
