const request = require('request');

let getWeather = (lat,lng,callback) => {
    debugger;
    request({

        url:`https://api.darksky.net/forecast/c6df9db0df1768b3c5393487915e28ac/${lat},${lng}`,
        json:true
    },(error,response,body) =>{
        if(!error && body.code!=400){
            callback(undefined,{
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        }else{
            if(body.error){
                callback(body.error);
            }else {
                callback('Unable to fetch weather');
            }
        }
    });
};

module.exports.getWeather = getWeather;
//api key : c6df9db0df1768b3c5393487915e28ac