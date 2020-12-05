const Sequelize = require("sequelize");
const dbConfig = require("../config/config.js");

const sequelize = new Sequelize(
    dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.DIALECT
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Player = require("./players.db")(sequelize, Sequelize);

module.exports = db;
