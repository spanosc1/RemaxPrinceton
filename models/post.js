var mongoose= require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	imagePath: {type: String, required: false},
	imageCaption: {type: String, required: false},
	title: {type: String, required: true},
	description: {type: String, required: false},
	body: {type: String, required: true},
	authorEmail: {type: String, required: false},
	authorName: {type: String, required: true},
	date: {type: Number, required: true},
	featured: {type: Boolean, required: false},
});

module.exports = mongoose.model('Post', schema);