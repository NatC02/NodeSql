const express = require("express");
const app = express();
const mysql = require("mysql");

const pool = mysql.createPool({
  host: "localhost",
  user: "username",
  password: "password",
  database: "databasename",
});

app.get("/", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    connection.query("SELECT * from users LIMIT 1", (err, rows) => {
      connection.release(); // return the connection to pool
      if (err) throw err;
      console.log("The data from users table are: \n", rows);
    });
  });
});

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
