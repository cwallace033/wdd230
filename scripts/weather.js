const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const weatherDesc = document.querySelector(`#weather-desc`);
const captionDesc = document.querySelector('figcaption');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=41.83&lon=-111.83&appid=95269c37d13c4d1151344fcad05b488c&units=imperial';

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

apiFetch();

function displayResults (data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    let desc =  data.weather[0].description;
    weatherDesc.innerHTML = `${desc}`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
}