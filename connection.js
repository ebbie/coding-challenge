const mysql = require("mysql");
var mysqlConnection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password:  "Jeremiah/2911",
    database : "RxSavingsSolution",
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