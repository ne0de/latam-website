var express = require('express');
const { Player } = require('../models');
const { Op } = require("sequelize");
const fetch = require("node-fetch");
var router = express.Router();


router.get('/', async function(req, res, next) {
  /* cambiar el campo IP= */
  var data = await fetch('http://monitor.sacnr.com/api/?IP=172.107.2.27&Port=8612&Action=info&Format=json')
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
  topPlayers['puntos'];
  topPlayers.forEach((element, index) => { 
    element.numero = index + 1; 
    element.puntos = element.ranked; 
  });
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
  topPlayers['puntos'];
  topPlayers.forEach((element, index) => { 
    element.numero = index + 1; 
    element.numero = element.team_ranked;
  });
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
  topPlayers['puntos'];
  topPlayers.forEach((element, index) => {
    element.numero = index + 1; 
    element.puntos = element.won_duels;
  });
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
  topPlayers['puntos'];
  topPlayers.forEach((element, index) => { 
    element.numero = index + 1; 
    element.puntos = element.lost_duels;
  });
  console.log(topPlayers)
  res.render('rankedplayers', {topPlayers, tipo});
});


module.exports = router;
