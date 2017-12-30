const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

console.log(argv);
debugger;
geocode.geocodeAddress(argv.address,(errorMessage,results) =>{
    if(errorMessage){
        console.log(errorMessage);
    }else{
        console.log(results.address);
        weather.getWeather(results.latitude,results.longitude,(errorMessage,weatherResults) => {
            if(errorMessage){
                console.log(errorMessage);
            }else{
                console.log(`It's curently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}`);
            }
        });
    }
});