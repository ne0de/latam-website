var express = require('express');
const { Player } = require('../models');
const fetch = require("node-fetch");
var router = express.Router();



/* GET home page. */
router.get('/', async function(req, res, next) {
  var data = await fetch('http://monitor.sacnr.com/api/?IP=172.107.2.27&Port=8612&Action=info&Format=json')
  const serverInfo = await data.json();
  console.log(serverInfo)
  res.render('home', {serverInfo});
});

module.exports = router;
