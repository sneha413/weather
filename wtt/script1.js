// Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
const apiKey = '5137251875da7415c55baeb07d67864d';

function getWeather() {
    const location = document.getElementById('locationInput').value;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    
    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
                getHourlyForecast(data.coord.lat, data.coord.lon);
            } else {
                alert('City not found. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            alert('An error occurred. Please try again later.');
        });
}

function displayWeather(data) {
    document.getElementById('temp-div').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('weather-info').textContent = `Weather: ${data.weather[0].description}`;
    document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    document.getElementById('weather-icon').style.display = 'block';
}

function getHourlyForecast(lat, lon) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching the hourly forecast:', error);
        });
}

function displayHourlyForecast(forecast) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    hourlyForecastDiv.innerHTML = ''; // Clear previous forecast

    for (let i = 0; i < 5; i++) {
        const forecastData = forecast[i];
        const forecastElement = document.createElement('div');
        forecastElement.classList.add('forecast-element');

        const time = new Date(forecastData.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const temp = `${forecastData.main.temp}°C`;
        const icon = `http://openweathermap.org/img/wn/${forecastData.weather[0].icon}.png`;

        forecastElement.innerHTML = `
            <div>${time}</div>
            <img src="${icon}" alt="Weather Icon">
            <div>${temp}</div>
        `;

        hourlyForecastDiv.appendChild(forecastElement);
    }
}
