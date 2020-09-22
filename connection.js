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
var connection;

function handleDisconnect() {
    connection = mysql.createConnection(mysqlConnection); // Recreate the connection, since
    // the old one cannot be reused.

    connection.connect(function(err) {
        console.log(err.code); // 'ECONNREFUSED'
        console.log(err.fatal); // true
    });
    /*   connection.connect(function(err) {              // The server is either down
        if(err) {                                     // or restarting (takes a while sometimes).
          console.log('error when connecting to db:', err);
          // setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }                                     // to avoid a hot loop, and to allow our node script to
      });                                     // process asynchronous requests in the meantime.
     */ // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect(); // lost due to either server restart, or a
        } else { // connnection idle timeout (the wait_timeout
            throw err; // server variable configures this)
        }
    });
}

handleDisconnect();

module.exports = mysqlConnection;