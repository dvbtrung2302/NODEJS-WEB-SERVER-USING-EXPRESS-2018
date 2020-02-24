var shortId = require('shortid');
var db = require('../db');

module.exports = function(req, res, next) {
	var sessionId = req.signedCookies.sessionId;
	var totalItems = db.get('session')
					   .find({ id: sessionId })
					   .get('cart')
					   .value();

	if (!totalItems) {
		totalItems =  {};
	}

	res.locals.cart = Object.values(totalItems)
							.reduce(function(a, b) {
								return a + b;
							}, 0);

	if (!sessionId) {
		var sessionId = shortId.generate();
		res.cookie('sessionId', sessionId, {
			signed: true
		});

		db.get('session').push({
			id: sessionId
		}).write();
	}	
	next();
}