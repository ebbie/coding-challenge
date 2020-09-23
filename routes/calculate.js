const express = require("express")
const Router = express.Router()
const mysqlConnection = require("../connection")

Router.post("/", getPharmacyDetailswithMiles);

// get the pharmacy details with distance
function getPharmacyDetailswithMiles(req, res, next) {
    userLatitude = req.body.latitude
    userLongitude = req.body.longitude
    mysqlConnection.query('SELECT * FROM LOCATION', req.body, (err, rows, fields) => {
        if (!err) {

            var pharmacyDetailswithDistance = []

            for (i = 0; i < rows.length; i++) {

                pharmacyLongitude = rows[i].longitude
                pharmacyLatitude = rows[i].latitude
                pharmacyName = rows[i].name
                pharmacyAddress = rows[i].address
                pharmacyCity = rows[i].city
                pharmacyState = rows[i].state
                pharmacyZip = rows[i].zip

                pharmacyData = nearestPharmacy(userLatitude, userLongitude, pharmacyLatitude, pharmacyLongitude, 'M', pharmacyName, pharmacyAddress, pharmacyCity, pharmacyState, pharmacyZip);
                pharmacyDetailswithDistance.push(pharmacyData)
            }
            pharmacyDetailswithDistance.sort(function(a, b) {
                return a.dist - b.dist;
            });
            res.send(pharmacyDetailswithDistance[0])
        } else {
            console.log(err);
        }
    })
}

// find nearest pharmacy based on current location
function nearestPharmacy(lat1, lon1, lat2, lon2, unit, pharmacyName, pharmacyAddress, pharmacyCity, pharmacyState, pharmacyZip) {
    var pharmacyName = pharmacyName
    var pharmacyAddress = pharmacyAddress
    var pharmacyCity = pharmacyCity
    var pharmacyState = pharmacyState
    var pharmacyZip = pharmacyZip

    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    } else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }

        var pharmaData = { 'pharmacyName': pharmacyName, 'pharmacyAddress': pharmacyAddress, 'pharmacyCity': pharmacyCity, 'pharmacyState': pharmacyState, 'pharmacyZip': pharmacyZip, 'dist': dist }
        return pharmaData;
    }
    next();
}

module.exports = Router;