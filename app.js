const express = require("express");
const app = express();
const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 100, //important
  host: "localhost",
  user: "root",
  password: "",
  database: "todolist",
  debug: false,
});

//Deleting rows

function deleteRow(userName) {
  let deleteQuery = "DELETE from ?? where ?? = ?";
  let query = mysql.format(deleteQuery, ["todo", "user", userName]);
  // query = DELETE from `todo` where `user`='shahid';
  pool.query(query, (err, response) => {
    if (err) {
      console.error(err);
      return;
    }
    // rows deleted
    console.log(response.affectedRows);
  });
}

// timeout just to avoid firing query before connection happens

setTimeout(() => {
  // call the function
  // delete row
  deleteRow("shahid");
}, 5000);

// update rows

function updateRow(data) {
  let updateQuery = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
  let query = mysql.format(updateQuery, [
    "todo",
    "notes",
    data.value,
    "user",
    data.user,
  ]);
  // query = UPDATE `todo` SET `notes`='Hello' WHERE `name`='shahid'
  pool.query(query, (err, response) => {
    if (err) {
      console.error(err);
      return;
    }
    // rows updated
    console.log(response.affectedRows);
  });
}

// timeout just to avoid firing query before connection happens

setTimeout(() => {
  // call the function
  // update row
  updateRow({
    user: "Shahid",
    value: "Just updating a note",
  });
}, 5000);

// add rows in the table

function addRow(data) {
  let insertQuery = "INSERT INTO ?? (??,??) VALUES (?,?)";
  let query = mysql.format(insertQuery, [
    "todo",
    "user",
    "notes",
    data.user,
    data.value,
  ]);
  pool.query(query, (err, response) => {
    if (err) {
      console.error(err);
      return;
    }
    // rows added
    console.log(response.insertId);
  });
}

// timeout just to avoid firing query before connection happens

setTimeout(() => {
  // call the function
  addRow({
    user: "Shahid",
    value: "Just adding a note",
  });
}, 5000);

// query rows in the table

function queryRow(userName) {
  let selectQuery = "SELECT * FROM ?? WHERE ?? = ?";
  let query = mysql.format(selectQuery, ["todo", "user", userName]);
  // query = SELECT * FROM `todo` where `user` = 'shahid'
  pool.query(query, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    // rows fetch
    console.log(data);
  });
}

// timeout just to avoid firing query before connection happens

setTimeout(() => {
  // call the function
  // select rows
  queryRow("shahid");
}, 5000);

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
