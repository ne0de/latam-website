const db = require("../models");
const Games = db.Games;

exports.mostrarJuegos = (req, res) => {
    res.render("games/hola");
}

exports.showCreate = (req, res) => {
    res.render('games/insert');
}

































exports.addGame = async (req, res) => {
    var game = req.body;
    await Games.create(game);
    console.log(game)
    res.send("Juego agregado satisfactoriamente");
}

exports.findAll = async (req, res) => { 
    const query = await Games.findAll();
    console.log(query);
    res.send({
        response: query.games
    });
};