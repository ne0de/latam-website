var express = require('express');
const { Player, sequelize } = require('../models');
const { Op } = require("sequelize");
const fetch = require("node-fetch");
var router = express.Router();



/* GET home page. */
router.get('/', async function(req, res, next) {
  var data = await fetch('http://monitor.sacnr.com/api/?IP=207.244.237.213&Port=7737&Action=info&Format=json')
  const serverInfo = await data.json();
  res.render('home', {serverInfo});
});

router.get('/players', async function(req, res, next) {
  const players = await Player.findAll({raw:true});
  res.send({
    data: players
  })
});

router.get('/jugadores', async function(req, res, next) {
  const players = await Player.findAll({raw:true});
  res.render('players', {players});
});

router.get('/jugador/:id', async function(req, res, next) {
  const jugador = await Player.findAll({
    raw: true,
    where: {
      id: req.params.id
    }
  });
  res.render('playerProfile', {jugador});
});

router.get('/ranked', async function(req, res, next) {
  const topPlayers = await Player.findAll(
    {
      raw:true,
      where: {
        ranked: {
          [Op.gt]: 0
        }
      },
      order: [
        ['ranked', 'DESC']
      ] 
    }
  );
  var tipo = "puntaje individual"
  topPlayers['numero'];
  topPlayers.forEach((element, index) => { element.numero = index + 1; });
  res.render('rankedplayers', {topPlayers, tipo});
});

router.get('/ranked/equipo', async function(req, res, next) {
  const topPlayers = await Player.findAll(
    {
      raw:true,
      where: {
        team_ranked: {
          [Op.gt]: 0
        }
      },
      order: [
        ['team_ranked', 'DESC']
      ] 
    }
  );
  var tipo = "puntaje en equipo"
  topPlayers['numero'];
  topPlayers.forEach((element, index) => { element.numero = index + 1; });
  res.render('rankedplayers', {topPlayers, tipo});
});

router.get('/duelos/ganados', async function(req, res, next) {
  const topPlayers = await Player.findAll(
    {
      raw:true,
      where: {
        won_duels: {
          [Op.gt]: 0
        }
      },
      order: [
        ['won_duels', 'DESC']
      ] 
    }
  );
  var tipo = "duelos ganados"
  topPlayers['numero'];
  topPlayers.forEach((element, index) => { element.numero = index + 1; });
  res.render('rankedplayers', {topPlayers, tipo});
});

router.get('/duelos/perdidos', async function(req, res, next) {
  const topPlayers = await Player.findAll(
    {
      raw:true,
      where: {
        lost_duels: {
          [Op.gt]: 0
        }
      },
      order: [
        ['lost_duels', 'DESC']
      ] 
    }
  );
  var tipo = "duelos perdidos"
  topPlayers['numero'];
  topPlayers.forEach((element, index) => { element.numero = index + 1; });
  res.render('rankedplayers', {topPlayers, tipo});
});


module.exports = router;
