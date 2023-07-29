const express = require('express')
const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

//connect db
const db = mysql.createConnection(
    {
        host: 'localhost',
        user:'root',
        password:'',
        database:'employee_db'
    }
)

db.connect((err) =>{
    if (err) throw err;
    console.log('connected to database');
});

app.listen(PORT, () =>{
    console.log(`server running on port ${PORT}`)
});