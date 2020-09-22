const express = require("express");
const bodyParser = require("body-parser");
const LocationsRoutes = require("./routes/locations")
const CalculateRoutes = require("./routes/calculate")
const mysqlConnection= require("./connection")
const port = process.env.port || 5000

var app = express();
app.use(bodyParser.json());

//static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

//  Set Views
app.set('views', './views')
app.set('view engine', 'ejs')

app.get("/", (req, res)=> {
    res.render('index')
})

app.use("/locations", LocationsRoutes);
app.use("/calculate", CalculateRoutes);

app.listen(port, ()=> console.log("Express server is running at post no : 5000"));
