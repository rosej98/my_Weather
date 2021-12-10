// feature 1
let now = new Date();
let date = now.getDate();
let months = [
  "Jan. ",
  "Feb. ",
  "Mar. ",
  "Apr. ",
  "May ",
  "Jun. ",
  "Jul. ",
  "Aug. ",
  "Sep. ",
  "Oct. ",
  "Nov. ",
  "Dec. ",
];

let month = months[now.getMonth()];
let days = ["Sun.", "Mon.", "Tue.", "Wed.", "Thur.", "Fri.", "Sat."];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = "0" + hour;
}

let minute = now.getMinutes();

if (minute < 10) {
  minute = "0" + minute;
}

let dte = document.querySelector("#dte");
dte.innerHTML = month + date + " " + day + " " + hour + ":" + minute;

function search(city) {
  let apiKey = "689efb7d786944e7c1a6b5dddb92c594";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(updateInfo);
}
function getInfo(event) {
  event.preventDefault();
  let searchBox = document.querySelector("#searchCityName");
  let citySearch = searchBox.value;
  search(citySearch);
}

function updateInfo(response) {
  let searchBox = document.querySelector("#searchCityName");
  searchBox.value = "";

  tempCurrentCel = Math.round(response.data.main.temp);
  tempCurrFeelsLikeCel = Math.round(response.data.main.feels_like);

  let icon = response.data.weather[0].icon;
  let w = response.data.wind.speed;
  let humidity = response.data.main.humidity;
  let visibility = response.data.visibility / 100;

  let imgToday = document.querySelector("#dayIcon");
  let tempBox = document.querySelector("#tempreature");
  let tempBoxFeelsLike = document.querySelector("#tempFL");
  let windBox = document.querySelector("#wind");
  let humidityBox = document.querySelector("#humidity");
  let visibiltyBox = document.querySelector("#visibility");

  let cityName = response.data.name;
  let city = document.querySelector("#cityName");

  let u = document.querySelector("#unit");
  let u2 = document.querySelector("#unit2");

  u.innerHTML = "°C";
  u2.innerHTML = "°C";

  imgToday.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  imgToday.setAttribute("alt", response.data.weather[0].description);
  tempBox.innerHTML = tempCurrentCel;
  city.innerHTML = cityName;
  tempBoxFeelsLike.innerHTML = tempCurrFeelsLikeCel;
  windBox.innerHTML = w;
  humidityBox.innerHTML = humidity;
  visibiltyBox.innerHTML = visibility;

  getForecast(response.data.coord);
}

let citySearch = document.querySelector("form");

citySearch.addEventListener("submit", getInfo);

search("Tehran");

function getLocation(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;

  let apiKey = "689efb7d786944e7c1a6b5dddb92c594";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(updateInfo);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let btn = document.querySelector("#currntLoc");
btn.addEventListener("click", getCurrentLocation);

let tempCurrentCel = null;
let tempCurrFeelsLikeCel = null;

function getForecast(coordinates) {
  let lon = coordinates.longitude;
  let lat = coordinates.latitude;

  let apiKey = "689efb7d786944e7c1a6b5dddb92c594";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayForecast);
}

function formatDay(timespan) {
  let date = new Date(timespan * 1000);
  let day = date.getDay();
  let days = ["Sun.", "Mon.", "Tue.", "Wed.", "Thur.", "Fri.", "Sat."];

  return days[day];
}

function formatDate(timespan) {
  let fullDate = new Date(timespan * 1000);
  let mon = fullDate.getMonth();
  let date = fullDate.getDate();
  let months = [
    "Jan. ",
    "Feb. ",
    "Mar. ",
    "Apr. ",
    "May ",
    "Jun. ",
    "Jul. ",
    "Aug. ",
    "Sep. ",
    "Oct. ",
    "Nov. ",
    "Dec. ",
  ];

  if (date < 10) {
    date = "0" + date;
  }

  return months[mon] + date;
}
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;
  let forecastHTML = `<div class="row">
  <div class="col">
              <div class="card prediction legend">
                <div class="card-body">
                  </br>
                  </br>
               </br>
                  <div class="col-12">
                  <label for="html"
                    >Day.
                    <i class="fas fa-hand-point-right"></i>
                  </label>
                  </div>
                                    <div class="col-12">
                  <label for="html"
                    >Night <i class="fas fa-hand-point-right"></i
                  ></label>
                  </div>
                  <div class="col-12">
                  <label for="html"
                    >POP <i class="fas fa-hand-point-right"></i
                  ></label>
                  </div>
                </div>
              </div>
            </div> `;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6 && 0 < index) {
      forecastHTML += `
                  <div class="col">
                <div class="card prediction">
                  <div class="card-body">
                    <div class="col-12 forecast-day">${formatDay(
                      forecastDay.dt
                    )}</div>
                    <div class="col-12 forecast-date">${formatDate(
                      forecastDay.dt
                    )}</div>
                    <div class="col-12 forecast-img">
                      <img src= http://openweathermap.org/img/wn/${
                        forecastDay.weather[0].icon
                      }@2x.png width="30px" />
                    </div>
                    <div class="col-12 forecast-temp">${Math.round(
                      forecastDay.temp.day
                    )}°C</div>
                                       <div class="col-12 forecast-night">${Math.round(
                                         forecastDay.temp.night
                                       )}°C</div>
                    <div class="col-12 forecast-pop">${Math.round(
                      forecastDay.pop
                    )}%</div>
                  </div>
                </div>
              </div>`;
    }
  });

  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
