const request = require("request");


var geocodeAddress = (address)=>{

    return new Promise((resolve,reject)=>{
        request({
            url: "https://maps.googleapis.com/maps/api/geocode/json?address="+encodeURIComponent(address),
            json:true
        },(error, response, body)=>{
            if(error)
            {
                reject("Unable to connect to google server");
            }else if(body.status === "ZERO_RESULTS")
            {
                reject("Unable to find address");
            }else if(body.status === "OK")
            {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }

        });
    })

};


geocodeAddress("334001").then((location)=>{
    console.log(JSON.stringify(location,undefined,2));
},(errorMessage)=>{
    console.log(errorMessage);
})