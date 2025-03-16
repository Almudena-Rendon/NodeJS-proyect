var mysql = require("mysql");
var connection = mysql.createConnection({
  host: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
  password: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("conexión correcta");
});

module.exports = connection;
