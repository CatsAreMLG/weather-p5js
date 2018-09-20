var weather;
var met;
var i;
var randomWind;
var windSpeed;
var temperature;
function setup() {
    createCanvas(800, 800);
    angleMode(DEGREES);
    randomWind = 0;
    i = 0;
    loadJSON(`http://api.openweathermap.org/data/2.5/weather?id=4726206&units=imperial&appid=${config.apiKey}`, gotData);
}
function gotData(data) {
    weather = data;
}
function draw() {
    background(0);
    frameRate(60);
    if (weather) {
        // variables
        const windDirection = weather.wind.deg;
        const windSpeed = weather.wind.speed;
        const temperature = weather.main.temp;
        // temp
        if (temperature < 0) {
            temperature = 0;
        } else if (temperature > 100) {
            temperature = 100;
        }
        // windsock
        if (met || randomWind == 0) {
            randomWind = (Math.random()-0.5) * windSpeed;
            met = 0;
        }
        if (i > randomWind && randomWind > 0 || i > 2.5) {
            i -= randomWind / 10;
            randomWind = (Math.random() - 0.5) * windSpeed;
            met = 1;
        } else if (i < randomWind && randomWind < 0 || i < -2.5) {
            i += randomWind / 10;
            randomWind = (Math.random() - 0.5) * windSpeed;
            met = 1;
        }
        if (i < -2.5){
            i += (windSpeed / 20);
        } else if (i > 2.5) {
            i += -(windSpeed / 20);
        } else {
            i += (windSpeed / 20) * (Math.sign(randomWind));
        }
        // draw
        background(2.55 * temperature, (((temperature / 100) - 1) * -100) * 1.8, ((temperature / 100) - 1) * -255);
        document.getElementById('p').innerHTML = 'Temperature: ' + temperature + ' - Wind Speed: ' + weather.wind.speed + ' - Wind Direction: ' + ((windDirection)?windDirection:'No Current Wind Direction Weather Data.') + ' - Wind Speed Iterator: ' + i;
        stroke(255);
        translate(width/2, height/2)
        rotate(windDirection + i);
        line(0, 0, 0, 50);
    }
}