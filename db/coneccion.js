const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('../keys/db');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('LA CONECCION CON LA DB HA SIDO CERRADA');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('LA DB TIENE MAS CONECCIONES');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('LA CONECCION CON LA DB HA SIDO RECHAZADA');
        }
    }
    if (connection) connection.release();
    console.log('DB CONECTADA');
    return;
});

// conviertiendo promesas lo que antes era en callbacks
pool.query = promisify(pool.query);

module.exports = pool;