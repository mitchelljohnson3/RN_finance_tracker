const mysql = require("mysql");
const util = require("util");
const config = require("./config");

const connection = mysql.createConnection(config);
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to database!");
});

const query = util.promisify(connection.query).bind(connection);

module.exports = query;
