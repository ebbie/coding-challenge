const express = require("express")
const Router = express.Router()
const mysqlConnection = require("../connection")

Router.get("/", (req,res) => {
    mysqlConnection.query('SELECT * fROM LOCATION', (err,rows, fields)=>{
        if(!err){
            res.send(rows);
            console.log(typeof(rows));
        }
        else{
            console.log(err);
        }
    })
})

//Get a user location
Router.get('/latitude=:id', (req,res)=> {
    mysqlConnection.query('SELECT * FROM LOCATION WHERE latitude = ?',[req.params.id],(err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
});
module.exports = Router;