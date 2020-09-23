const mysql = require("mysql");

var mysqlConnection = process.env.DATABASE_URL || mysql.createConnection('mysql://b24f8644abd1dc:19306b25@us-cdbr-east-02.cleardb.com/heroku_398b6021c3fb5aa?debug=true&charset=BIG5_CHINESE_CI&timezone=-0700');

/* var mysqlConnection = mysql.createConnection({
    host: "35.232.224.199",
    user: "coding-challenge",
    password: "Asdfghjkl",
    database: "RxSavingsSolution",
    multipleStatements: true
}) */

mysqlConnection.connect((err) => {
    if (!err) {
        console.log("Connected");
    } else {
        console.log("Connection Failed" + JSON.stringify(err, undefined, 2));
    }
})

module.exports = mysqlConnection;