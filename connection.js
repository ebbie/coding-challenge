const mysql = require("mysql");
var mysqlConnection = mysql.createConnection({
    host : "us-cdbr-east-02.cleardb.com",
    user : "b24f8644abd1dc",
    password:  "19306b25",
    database : "heroku_398b6021c3fb5aa",
    multipleStatements : true
})

mysqlConnection.connect((err) => {
    if(!err)
    {
        console.log("Connected");
    }
    else{
        console.log("Connection Failed" + JSON.stringify(err,undefined, 2));
    }
})

module.exports = mysqlConnection;