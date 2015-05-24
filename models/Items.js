var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
	name: {type: String, required: true},
	price: {type: Number, required: true},
	quantity: {type: Number, required: true}
});

mongoose.model('Item', ItemSchema);