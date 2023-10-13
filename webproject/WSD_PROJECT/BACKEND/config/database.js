const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config({ path: "config/config.env" });

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hr",
  port: 3306,
});
module.exports = db;
