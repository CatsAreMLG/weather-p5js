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
        windDirection = weather.wind.deg;
        windSpeed = weather.wind.speed;
        temperature = weather.main.temp;
        if (temperature < 0) {
            temperature = 0;
        } else if (temperature > 100) {
            temperature = 100;
        }
        if (i >= randomWind) {
            met = 1;
        }
        if (met) {
            randomWind = random(-1, 1) * windSpeed;
            met = 0;
        }
        if (i > randomWind || i > 5) {
            i -= .22;
            randomWind = random(-1, 1) * windSpeed;
        } else if (i < -1*windSpeed || i < -5) {
            i += .2;
            randomWind = random(-1, 1) * windSpeed;
        }
        i += .2 * (randomWind/5);
        background(2.55 * temperature, (((temperature / 100) - 1) * -100) * 1.8, ((temperature / 100) - 1) * -255);
        document.getElementById('p').innerHTML = 'Temperature: ' + temperature + ' - Wind Speed: ' + weather.wind.speed + ' - Wind Direction: ' + ((windDirection)?windDirection:'No Current Wind Direction Weather Data.') + ' - Wind Speed Iterator: ' + i;
        stroke(255);
        translate(width/2, height/2)
        rotate(windDirection + i);
        line(0, 0, 0, 50);
    }
}