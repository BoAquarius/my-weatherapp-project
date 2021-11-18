// week4.1 : DATE & TIME

function showToday(date) {
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let timeNow = `${hour}:${minutes}`;

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let dayNow = days[date.getDay()];
  let dateNow = date.getDate();
  let monthNow = months[date.getMonth()];
  let yearNow = date.getFullYear();

  console.log(dayNow);
  console.log(dateNow);
  console.log(monthNow);
  console.log(yearNow);
  console.log(timeNow);
  console.log(`${dayNow}, ${dateNow} ${monthNow} ${yearNow} - ${timeNow}`);

  return `${dayNow}, ${dateNow} ${monthNow} ${yearNow} - ${timeNow}`;
}

let dateToday = document.querySelector("#date-today");
let now = new Date();
dateToday.innerHTML = showToday(now);

console.log(now);

// week4.2 & week5.1 : WEATHER CONDITIONS IN SEARCHED CITY

function displayWeather(response) {
  console.log(response.data.name);
  let currentCityName = document.querySelector("h2");
  currentCityName.innerHTML = response.data.name;

  let weatherDescription = document.querySelector("h6");
  weatherDescription.innerHTML = response.data.weather[0].main;

  let temperatureElement = document.querySelector("#degrees");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let sunriseElement = document.querySelector("#sunrise");
  sunriseElement.innerHTML = response.data.sys.sunrise;

  let sunsetElement = document.querySelector("#sunset");
  sunsetElement.innerHTML = response.data.sys.sunset;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed;
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "9a9b131f757f5f5e890f4825be8ec528";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  console.log(apiUrl);

  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = searchInput.value;

  searchCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

searchCity("Brussels");

// week5.2 : WEATHER CONDITIONS IN CURRENT LOCATION

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "9a9b131f757f5f5e890f4825be8ec528";
  let apiUrlPosition = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  console.log(apiUrlPosition);

  axios.get(apiUrlPosition).then(displayWeather);
}

function getCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

// week4.3 : CONVERT °C TO °F (this current solution is not ideal)

function showTemperatureFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degrees");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showTemperatureFahrenheit);

function showTemperatureCelsious(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degrees");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let celsiousLink = document.querySelector("#celsious");
celsiousLink.addEventListener("click", showTemperatureCelsious);
