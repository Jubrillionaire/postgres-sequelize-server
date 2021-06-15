
const env = require('./env.js');

const Sequelize = require('sequelize');

const {Pool} = require('pg')
const isProduction = process.env.NODE_ENV === 'production'

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  //ssl: isProduction,
})


const sequelize = new Sequelize(process.env.DATABASE_URL, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // <<<<<<< YOU NEED THIS
    }
  },
  pool
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.customers = require('../model/customer.model.js')(sequelize, Sequelize);

module.exports = db;