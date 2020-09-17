const mongoose = require('mongoose');

const promosSchema = new mongoose.Schema({
	user: Object,
	firstUrl:String,
	firstMessage:String,
	secondUrl:String,
	secondMessage:String,

})
module.exports = mongoose.model('Promos', promosSchema);