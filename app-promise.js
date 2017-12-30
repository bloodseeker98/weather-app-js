const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a:{
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true   //tells the yargs to always parse it into string
        }
    })
    .help()
    .alias('help','h')
    .argv;

let encodedAddress = encodeURIComponent(argv.address);
let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find that address.');
    }else
        if(response.data.status=='OVER_QUERY_LIMIT'){
        throw new Error('Try again after sometime...');
    }

    let lat = response.data.results[0].geometry.location.lat;
    let lng =  response.data.results[0].geometry.location.lng;
    let weatherUrl = `https://api.darksky.net/forecast/c6df9db0df1768b3c5393487915e28ac/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response) => {
    let temperature = response.data.currently.temperature;
    let apparentTemperature =  response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`)
}).catch((e) => {
    if(e.code==='ENOTFOUND'){
        console.log('Unable to connect to API servers.');
    }else{
        console.log(e.message);
    }
});
