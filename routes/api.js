var express = require('express');
var router = express.Router();
var components = require('./api/components');


router.use('/components', components);

router.get('*', function (req, res, next) {
	res.send(404, '404 - API Not Found');
});

module.exports = router;