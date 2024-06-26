const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const weatherDesc = document.querySelector(`#weather-desc`);
const captionDesc = document.querySelector('figcaption');
const windSpeed = document.querySelector('.windspeed');
const windchillElement = document.getElementById('windchill');
const forecastContainer = document.querySelector('#forecast')

const url = 'https://api.openweathermap.org/data/2.5/forecast?lat=41.83&lon=-111.83&appid=95269c37d13c4d1151344fcad05b488c&units=imperial';

async function apiFetch(){
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}


function displayResults (data) {
    
    const currentWeather = data.list[0];
    const temperature = currentWeather.main.temp;
    currentTemp.innerHTML = `${temperature}&deg;F`;

    let desc =  currentWeather.weather[0].description;
    weatherDesc.innerHTML = `${desc}`;

    const iconsrc = `https://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);

    const windspeed = currentWeather.wind.speed;
    windSpeed.innerHTML = `${windspeed} mph`;

    const windchill = calculateWindChill(temperature, windspeed);
    windchillElement.textContent = `Feels like ${windchill} °F with wind chill`;

    displayForecast(data.list);
}

function displayForecast(forecastList) {
    forecastContainer.innerHTML = '';

    const days = {};
    forecastList.forEach(item => {
        const date = new Date(item.dt_txt);
        const day = date.toLocaleDateString('en-US', {weekday: 'long'});
        if (!days[day]) {
            days[day] = [];
        }
        days[day].push(item);
    });

    const dayNames = Object.keys(days).slice(0, 3);
    dayNames.forEach(day => {
        const dayForecast = days[day];
        const dayContainer =document.createElement('div');
        dayContainer.className = 'forecast-day';

        const dayTitle = document.createElement('h4');
        dayTitle.textContent = day;
        dayContainer.appendChild(dayTitle);

        let totalTemp = 0;
        dayForecast.forEach(item => {
            totalTemp += item.main.temp;
        });
        const avgTemp = totalTemp / dayForecast.length;
        
        const tempElement = document.createElement('p');
        tempElement.innerHTML = `Avg Temp: ${avgTemp.toFixed(1)}&deg;F`;
        dayContainer.appendChild(tempElement);

        forecastContainer.appendChild(dayContainer);
    })
}

function calculateWindChill(temperature, windspeed) {
    if (temperature <= 50 && windspeed > 3) {
        return Math.round(35.74 + 0.6215 * temperature - 35.75 *Math.pow(windspeed, 0.16) + 0.4275 * temperature *Math.pow(windspeed, 0.16));
    } else {
        return temperature;
    }
}

apiFetch();
