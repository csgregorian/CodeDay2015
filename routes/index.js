var express = require('express');
var router = express.Router();

// Mongo
var mongoose = require('mongoose');
var Item = mongoose.model('Item');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/api/items', function(req, res, next) {
	Item.find(function(err, items) {
		if (err) {
			return next(err);
		}

		res.set("Content-Type", "application/json");
		res.send(items);
	});
});

router.post('/api/items', function(req, res, next) {
	var item = new Item(req.body);

	item.save(function(err, post) {
		if (err) {
			return next(err);
		}

		res.set("Content-Type", "application/json");
		res.send(item);
	});

});

module.exports = router;
