const mysql = require('mysql');

module.exports = () => {
    return mysql.createConnection({
        host: 'localhost',
        user: 'lucasACM',
        password: '1234',
        database: 'carreras'
    });
}