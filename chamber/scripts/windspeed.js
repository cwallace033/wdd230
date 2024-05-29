

const temperatureElement = document.querySelector('.temperature');
const windspeedElement = document.querySelector('.windspeed');

const temperature = parseInt(temperatureElement.textContent);
const windspeed = parseInt(windspeedElement.textContent);

const windchill = Math.round(35.74 + 0.6215 * temperature - 35.75 * Math.pow(windspeed, 0.16) + 0.4275 * temperature * Math.pow(windspeed, 0.16));

const windchillElement = document.getElementById('windchill');
windchillElement.textContent = 'Wind Chill ' +windchill+ '°F';