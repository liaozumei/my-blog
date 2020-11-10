var express = require('express');
const users = require('../model/users');
var router = express.Router();
var cors = require('cors')

/* GET users listing. */
router.get('/', cors(),function(req, res, next) {
  res.render('me');
});







module.exports = router;
