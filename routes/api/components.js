var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/:name', function (req, res, next) {
	res.render(path.join(__dirname, '../../components/' + req.params.name + '/index.jade'));
});

router.get('/:name/*', function (req, res, next) {
	var p = path.join(__dirname, '../../components/' + req.path);
	
	if (path.extname(req.path) === ".jade" || path.extname(req.path) === ".html") {
		res.render(p);
	} else {
		res.sendFile(p);
	}
});

module.exports = router;