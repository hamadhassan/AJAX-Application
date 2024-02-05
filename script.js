function getWeatherForecast() {
    const cityInput = document.getElementById('cityInput');
    const weatherInfo = document.getElementById('weatherInfo');

    const cityId = cityInput.value;

    if (cityId.trim() === '') {
        alert('Please enter a city ID');
        return;
    }

    const apiKey = '38364e6ec0a76d719307520b4f5f4198'; // Replace with your API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                console.error(`HTTP error! Status: ${response.status}`);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Extract relevant information from the forecast data
            const forecastList = data.list.slice(0, 5); // Displaying the next 5 forecast entries for simplicity

            // Display the forecast information
            weatherInfo.innerHTML = '<h2>5-Day Weather Forecast:</h2>';
            forecastList.forEach(entry => {
                const timestamp = entry.dt_txt;
                const temperature = Math.round(entry.main.temp - 273.15); // Convert Kelvin to Celsius
                const description = entry.weather[0].description;

                weatherInfo.innerHTML += `<p>${timestamp}: ${temperature}°C, ${description}</p>`;
            });
        })
        .catch(error => {
            console.error('Error fetching weather forecast:', error);
            weatherInfo.innerHTML = `<p>Failed to fetch weather forecast. Error: ${error.message}</p>`;
        });
}