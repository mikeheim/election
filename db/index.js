var mysql = require('mysql')
const port = 3306
var connection = mysql.createConnection({
    host: 'localhost',
    port: port,
    user: 'root',
    password: 'password',
    database: 'elections',
    insecureAuth: true
});


connection.connect();

module.exports = connection;