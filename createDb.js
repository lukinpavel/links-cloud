var mongoose = require('./libs/mongoose');
mongoose.set('debug', true);
var async = require('async');

async.series([
	open,
	dropDatabase,
	requireModels,
	createUsers
], function(err, result){
	console.log(arguments);
	mongoose.disconnect();
	//process.exit(err ? 255 : 0);
});

function open(callback){
	mongoose.connection.on('open', callback);
}

function dropDatabase(callback){ 
	var db = mongoose.connection.db;
	db.dropDatabase(callback);
}

function requireModels(callback){
	require('./models/user');		// -------- 1
  
	async.each(Object.keys(mongoose.models), function(modelName, callback){
		mongoose.models[modelName].ensureIndexes(callback);
	}, callback);

}

function createUsers(callback){
	//require('./models/user');  // -------- 1

	//Variant 1
	var users = [
		{username: 'Vasaj', password: 'supervasja'},
		{username: 'Petaj', password: '123'}
	];

	async.each(users, function(userData, callback) {
	    var user = new mongoose.models.User(userData); // ------- 2
	    user.save(callback);
  }, callback);

}

