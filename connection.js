const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
    host: "35.232.224.199",
    user: "coding-challenge",
    password: "Asdfghjkl",
    database: "RxSavingsSolution",
    multipleStatements: true
})

mysqlConnection.connect((err) => {
    if (!err) {
        console.log("Connected");
    } else {
        console.log("Connection Failed" + JSON.stringify(err, undefined, 2));
    }
})

module.exports = mysqlConnection;