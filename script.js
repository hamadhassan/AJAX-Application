// Variables to store references to HTML elements
var temp = document.getElementById("temp");
var cityName = document.getElementById("city");
var humidity = document.getElementById("humidity");
var windspeed = document.getElementById("windspeed");
var searchinput = document.getElementById("searchinput");
var serchbox = document.getElementById("serchbox");
var body_img = document.getElementById("body_img");
var body_data = document.getElementById("body_data");
var deatil = document.getElementById("deatil");
var error = document.getElementById("error");

// Function to fetch weather data from OpenWeatherMap API
async function checkWeather(city) {
  // API key for OpenWeatherMap
  let apiKey = "f27b269d54e4fa1e72993364a80fa8bd";
  // Fetch weather data
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
  let data = await response.json();

  // Update HTML elements with weather data
  temp.innerHTML = Math.floor(data.main.temp) + "°C";
  cityName.innerHTML = data.name;
  humidity.innerHTML = data.main.humidity + "%";
  windspeed.innerHTML = data.wind.speed + "km/h";

  // Set weather image based on weather condition
  if (data.weather[0].main == "Clouds") {
    body_img.src = "image/cloud.png";
  } else if (data.weather[0].main == "Clear") {
    body_img.src = "image/clear.png";
  } else if (data.weather[0].main == "Rain") {
    body_img.src = "image/rain.png";
  } else if (data.weather[0].main == "Drizzle") {
    body_img.src = "image/drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    body_img.src = "image/mist.png";
  } else if (data.weather[0].main == "Haze") {
    body_img.src = "image/haze.png";
  }

  // Display main body and detail sections
  body_data.style.display = "flex";
  deatil.style.display = "flex";
}

// Event listener for search button click
serchbox.addEventListener("click", () => {
  let cityIn = searchinput.value;
  checkWeather(cityIn);
});
