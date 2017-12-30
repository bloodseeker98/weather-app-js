const request = require('request');

let geocodeAddress = (address,callback) => {
    let encodedAddress = encodeURIComponent(address);

    //options, followed by the function that will be executed after getting the request
    request({
        url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
    },(error,response,body) => {
        if (error) {
            callback("Unable to connect to Google servers.");
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find that address.');
        } else if (body.status === 'OK') {
            callback(undefined,{
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }else if(body.status=='OVER_QUERY_LIMIT'){
            callback('Try again after sometime...')
        }
    });
};

module.exports.geocodeAddress = geocodeAddress;
