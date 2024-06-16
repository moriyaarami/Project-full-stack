const search = document.querySelector('.search');
const input = document.querySelector('.cityInput');
const card = document.querySelector('.card');
const apiKey = '43f45b2da0063566b83a626d5db43ad3';

async function Search() {
    const city = input.value;
    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displatWeatherInfo(weatherData);
        } catch {
            alert('not found a city');
            input.value = '';
            card.style.display = 'none';

        }
    } else {
        alert('Please enter a city');
    }
    input.value = '';
}

async function getWeatherData(city) {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("couldn't get weather data");
    }

    return response.json();


}

function displatWeatherInfo(data) {
    card.innerHTML = '';
    card.style.display = 'flex';

    const cityName = document.createElement('h3');
    const city = data.name;
    const temp = document.createElement('p');
    const tempData = Math.round(data.main.temp - 273.15) + 1;
    const humidity = document.createElement('p');
    const description = document.createElement('p');
    const descriptionData = data.weather[0].description;
    const id = data.weather[0].id;
    const emogi = document.createElement('p');


    cityName.textContent = `${data.name}`;
    temp.textContent = `${tempData}°`;
    humidity.textContent = `Humiditly: ${data.main.humidity}%`;
    description.textContent = `${descriptionData}`;
    emogi.textContent = getEmogi(id);


    cityName.className = 'cityDisplay';
    temp.className = 'tempDisplay';
    humidity.className = 'humidityDisplay';
    description.className = 'descDisplay';
    emogi.className = 'weatherEmogi';

    card.appendChild(cityName);
    card.appendChild(temp);
    card.appendChild(humidity);
    card.appendChild(description);
    card.appendChild(emogi);


}

function getEmogi(id) {

    if (id >= 200 && id < 600) {
        return '🌧️';
    } else if (id >= 600 && id < 700) {
        return '❄️';
    } else if (id >= 700 && id < 800) {
        return '🌫️';
    } else if (id == 800) {
        return '☀️';
    } else if (id > 800 && id <= 810) {
        return '☁️';
    } else {
        return '❓'
    }
}


