//models/dm.db.js

//import sqlite3
const sqlite = require('sqlite3').verbose();

//create database connection
const connection = new sqlite.Database('./appdb.db',
    (error) => {
        if (error) {
            console.log('error establishing database connection...', error);
        }
        else {
            console.log('CONNECTED!!! Database Connection established...');
            //enable use of foreign keys in database
            connection.get('pragma foreign_keys=on');
        }
    });

//export database connection
module.exports = connection;