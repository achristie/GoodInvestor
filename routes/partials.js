var express = require('express');
var router = express.Router();

router.get('/:dir/:name', function (req, res, next) {
	res.render('partials/' + req.params.dir + '/' + req.params.name);
});

router.get('/:name', function (req, res, next) {
	res.render('partials/' + req.params.name);
});

	//res.send(404, '404 - Partial Not Found');

module.exports = router;