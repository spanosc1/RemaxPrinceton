var mongoose= require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	imagePath: {type: String, required: false},
	name: {type: String, required: true},
	title: {type: String, required: true},
	organization: {type: String, required: true},
	licenseNumber: {type: Number, required: true},
	agentCode: {type: String, required: true},
	preferredPhone: {type: String, required: false},
	directPhone: {type: String, required: false},
	mobilePhone: {type: String, required: false},
	email: {type: String, required: true},
	officeCode: {type: String, required: true},
	officePhone: {type: String, required: true},
	officeFax: {type: String, required: true},
	date: {type: Number, required: true},
	bio: {type: String, required: false}
	//activeListings: {type: Array, required: false}
});

module.exports = mongoose.model('Agent', schema);