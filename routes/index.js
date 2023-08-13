var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var db = require('../routes/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


module.exports = router;
