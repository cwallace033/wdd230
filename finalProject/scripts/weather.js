const currentTemp = document.querySelector('#current-temp');
const currentHumidity = document.querySelector('#current-humidity');
const tomorrowTemp = document.querySelector('#tomorrow-temp');
const weatherMain = document.querySelector('#weather-main');
const weatherIcon = document.querySelector('#weather-icon');
const weatherDesc = document.querySelector('#weather-desc');
const maxTempOfDay = document.querySelector('#tempHigh')


const apiKey = '95269c37d13c4d1151344fcad05b488c';
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=20.51&lon=-86.95&units=imperial&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=20.51&lon=-86.95&units=imperial&appid=${apiKey}`;

async function apiFetch() {
    try {
        const currentResponse = await fetch(currentWeatherUrl);
        const forecastResponse = await fetch(forecastUrl);
        if (currentResponse.ok && forecastResponse.ok) {
            const currentData = await currentResponse.json();
            const forecastData = await forecastResponse.json();
            displayCurrentWeather(currentData);
            displayForecast(forecastData);
        } else {
            throw new Error('Error fetching weather data');
        }
    } catch (error) {
        console.log(error);
    }
}

function displayCurrentWeather(data) {
    const temperature = data.main.temp;
    currentTemp.innerHTML = `${temperature}&deg;F`

    const humidity = data.main.humidity;
    currentHumidity.innerHTML = `${humidity}%`;

    const main = data.weather[0].main;
    weatherMain.innerHTML = main;

    const desc = data.weather[0].description;
    weatherDesc.innerHTML = desc;

    const icon = data.weather[0].icon;
    weatherIcon.src = `http://openweathermap.org/img/wn/${icon}.png`;
}

function displayForecast(data) {
    const forecastList = data.list;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const forecastFor3PM = forecastList.find(forecast => {
        const forecastDate = new Date(forecast.dt * 1000);
        return forecastDate.getDate() === tomorrow.getDate() && forecastDate.getHours() === 15;
    });
    if (forecastFor3PM) {
        tomorrowTemp.innerHTML = `${forecastFor3PM.main.temp}&deg;F`;
    } else {
        tomorrowTemp.innerHTML = 'No data available';
    }

    const days = {};
    forecastList.forEach(item => {
        const date = new Date(item.dt_txt);
        const day = date.toLocaleDateString('en-US', { weekday: 'long' });
        if (!days[day]) {
            days[day] = [];
        }
        days[day].push(item);
    });

    const dayNames = Object.keys(days);
    let maxTemp = -Infinity;
    let maxTempDay = '';

    dayNames.forEach(day => {
        const dayForecast = days[day];
        let tempOfDay = -Infinity;

        dayForecast.forEach(item => {
            if (item.main.temp > tempOfDay) {
                tempOfDay = item.main.temp;
            }
        });

        if (tempOfDay > maxTemp) {
            maxTemp = tempOfDay;
            maxTempDay = day;
        }
    });

    maxTempOfDay.innerHTML = `${maxTemp.toFixed(1)}`;
}


apiFetch();