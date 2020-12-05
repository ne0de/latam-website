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

router.get('/players', async function(req, res, next) {
  const players = await Player.findAll({raw:true});
  console.log(players);
  res.send({
    data: players
  })
});

router.get('/jugadores', async function(req, res, next) {
  const players = await Player.findAll({raw:true});
  res.render('players', {players});
});


module.exports = router;
