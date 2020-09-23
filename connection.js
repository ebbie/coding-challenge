// const mysql = require("mysql");
const { createPool } = require('mysql')

//var mysqlConnection = process.env.DATABASE_URL || mysql.createConnection('mysql://b24f8644abd1dc:19306b25@us-cdbr-east-02.cleardb.com/heroku_398b6021c3fb5aa?debug=true&charset=BIG5_CHINESE_CI&timezone=-0700');

var mysqlConnection = createPool({
    host: "us-cdbr-east-02.cleardb.com",
    user: "b24f8644abd1dc",
    password: "19306b25",
    database: "heroku_398b6021c3fb5aa",
    connectionLimit: 10
})

module.exports = mysqlConnection;