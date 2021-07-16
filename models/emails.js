var mongoose= require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	email: {type: String, required: true},
	date: {type: Number, required: true}
});

module.exports = mongoose.model('Emails', schema);