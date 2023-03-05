let currentTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function formatDate(date) {
  let currentDay = days[date.getDay()];

  let currentHours = currentTime.getHours();
  if (currentHours < 10) {
    currentHours = `0${hours}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${minutes}`;
  }
  let current = `${currentDay},   ${currentHours}:${currentMinutes}`;

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = `${current}`;
}

formatDate(currentTime);

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-city-search");
  let apiKey = "f09d3949047ab6c9e3bcaf79cf61f619";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
  function showTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = `It is ${temperature} °C in ${searchInput.value}`;
  }
}

let form = document.querySelector("#city-search");

form.addEventListener("submit", search);

function position(event) {
  event.preventDefault();
  function retrievePosition(position) {
    let apiKeyPosition = "5f472b7acba333cd8a035ea85a0d4d4c";
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKeyPosition}`;
    axios.get(url).then(showWeather);
  }
  function showWeather(response) {
    let location = document.querySelector("#location");
    let currentTemperature = Math.round(response.data.main.temp);
    location.innerHTML = `It is currently ${currentTemperature}°C in ${response.data.name}`;
  }
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", position);
