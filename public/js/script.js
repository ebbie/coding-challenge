if ('geolocation' in navigator) {
    console.log('geolocation available')
    navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        document.getElementById('latitude').innerText = lat;
        document.getElementById('longitude').innerText = lon;
    });
} else {
    console.log('geolocation is not available')
}

function submit() {
    $.ajax({
        url: "/calculate",
        type: "POST",
        dataType: "html",
        data: JSON.stringify({
            latitude: document.getElementById("latitude").innerText,
            longitude: document.getElementById("longitude").innerText

        }),
        contentType: "application/json",
        cache: false,
        beforeSend: function() {
            // setting a timeout
            document.getElementById("pharmacyName").value = "";
            document.getElementById("pharmacyAddress").value = "";
            document.getElementById("pharmacyCity").value = "";
            document.getElementById("pharmacyZip").value = "";
            document.getElementById("Dist").value = "";
        },
        success: function(data) {
            console.log(data);
            results = JSON.parse(data);
            showPharmacyResults(results)
            console.log('process sucess');
        },
        complete: function() {
            //called when complete
            console.log('process complete');
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log('error');
            console.log(XMLHttpRequest, textStatus, errorThrown);
        },
    });
}
var showPharmacyResults = function(results) {
    var PharmacyNamediv = document.getElementById("pharmacyName");
    var PharmacyAddressdiv = document.getElementById("pharmacyAddress");
    var PharmacyCitydiv = document.getElementById("pharmacyCity");
    var PharmacyZipdiv = document.getElementById("pharmacyZip");
    var DistanceDiv = document.getElementById("Dist");
    PharmacyNamediv.innerHTML = results.pharmacyName
    PharmacyAddressdiv.innerHTML = results.pharmacyAddress
    PharmacyCitydiv.innerHTML = results.pharmacyCity
    PharmacyZipdiv.innerHTML = results.pharmacyZip
    DistanceDiv.innerHTML = results.dist
}