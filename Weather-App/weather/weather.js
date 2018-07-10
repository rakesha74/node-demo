const request = require("request");

var getWeather = (latitude,longitude,callback)=> {
    request({
        url:`https://api.darksky.net/forecast/dcfb59c5ddf0a9bfd3f914856f092c39/${latitude},${longitude}`,
        json: true
    },(error,response,body)=>{
        if(error) {
            callback("Unable to connectto darak sky");
        }else if (response.statusCode === 400){
            callback("Unable to fetch weather");
        }else if(response.statusCode === 200) {
            callback(undefined,{
                temperature : body.currently.temperature,
                apparentTemperature : body.currently.apparentTemperature
            });
        }
    });
}

module.exports = {
    getWeather
}