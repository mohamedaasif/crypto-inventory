const mysql = require("mysql");

// imports
const config = require("../config/config.json");

const db = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});

module.exports = db;
