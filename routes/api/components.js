var express = require('express');
var router = express.Router();
var path = require('path');


router.get('/:name', function (req, res, next) {
	res.render(path.join(__dirname, '../../components/' + req.params.name + '/index.jade'));
});

module.exports = router;