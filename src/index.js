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

  fLink.classList.remove("not_active");
  cLink.classList.add("not_active");

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

function displayFa(event) {
  event.preventDefault();

  let temp = document.querySelector("#tempreature");
  let temp2 = document.querySelector("#tempFL");
  let u = document.querySelector("#unit");
  let u2 = document.querySelector("#unit2");
  let conTemp = Math.round(tempCurrentCel * 1.8 + 32);
  let conTemp2 = Math.round(tempCurrFeelsLikeCel * 1.8 + 32);

  cLink.classList.remove("not_active");
  fLink.classList.add("not_active");
  temp.innerHTML = conTemp;
  temp2.innerHTML = conTemp2;
  u.innerHTML = "°F";
  u2.innerHTML = "°F";
}

function displayCe(event) {
  event.preventDefault();

  let temp = document.querySelector("#tempreature");
  let temp2 = document.querySelector("#tempFL");
  let u = document.querySelector("#unit");
  let u2 = document.querySelector("#unit2");

  fLink.classList.remove("not_active");
  cLink.classList.add("not_active");

  temp.innerHTML = tempCurrentCel;
  temp2.innerHTML = tempCurrFeelsLikeCel;
  u.innerHTML = "°C";
  u2.innerHTML = "°C";
}

let cLink = document.querySelector("#C_Link");
cLink.addEventListener("click", displayCe);

let fLink = document.querySelector("#F_Link");
fLink.addEventListener("click", displayFa);

let tempCurrentCel = null;
let tempCurrFeelsLikeCel = null;
