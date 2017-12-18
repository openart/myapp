var mongoose = require('mongoose');

mongoose.Promise = global.Promise

var config = require('../config').mongo;

var dbUrl = config.url();
var dbOption = config.options;
mongoose.connect(dbUrl, dbOption);

exports.mongoose = mongoose;