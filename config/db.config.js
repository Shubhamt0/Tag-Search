const env = require('./env.js');
var config = require(__dirname + '/../config/config.json')[env];

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
  //port: 3306,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});





const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


//Models/tables
db.Tags = require('../models/tags.model')(sequelize, Sequelize);


module.exports = db;