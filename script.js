const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
var app = express();

//Configuring express server
app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'crud',
  multipleStatements: true
});

mysqlConnection.connect((err)=> {
  if(!err) {
    console.log('Connection Established Successfully');
  }
  else {
    console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
  }
});

//Establish the server connection
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));

app.get('/employees' , (req, res) => {
  mysqlConnection.query('SELECT * FROM employee', (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    }
    else {
      console.log(err);
    }
  })
});

app.get('/employee/:id' , (req, res) => {
  const id = req.params.id;
  mysqlConnection.query('SELECT * FROM employee where id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    }
    else {
      console.log(err);
    }
  })
});

app.post('/employee', (req, res) => {
  const { id, name, sal } = req.body;
  mysqlConnection.query('INSERT into employee values(?, ?, ?)',[id, name, sal], (err, rows, fields) => {
    if (!err) {
      res.send({ message: "Record inserted Successfully"});
    }
    else {
      console.log(err);
    }
  });
});

app.put('/employee/:id', (req, res) => {
  const { name, sal } = req.body;
  const { id } = req.params;
  mysqlConnection.query('update employee set name = ?, sal = ? where id = ?',[name, sal, id], (err, rows, fields) => {
    if (!err) {
      res.send({ message: "Record updated Successfully"});
    }
    else {
      console.log(err);
    }
  });
});

app.delete('/employee/:id', (req, res) => {
  const employee_id = req.params.id;
  mysqlConnection.query('DELETE FROM employee WHERE id = ?',[employee_id], (err, rows, fields) => {
    if (!err) {
      res.send({ message: "Record deleted Successfully"});
    }
    else {
      console.log(err);
    }
  });
});
