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

function getInfo(event) {
  event.preventDefault();
  let searchBox = document.querySelector("#searchCityName");
  let citySearch = searchBox.value;

  let apiKey = "689efb7d786944e7c1a6b5dddb92c594";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&units=metric`;
  // let apiUrlFuture = `https://api.openweathermap.org/data/2.5/forecast/daily?id=${citySearch}&cnt=6&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(updateInfo);
  //axios.get(`${apiUrlFuture}&appid=${apiKey}`).then(updateInfo);
}

function updateInfo(response) {
  let searchBox = document.querySelector("#searchCityName");
  searchBox.value = "";

  let icon = response.data.weather[0].icon;
  let temp = Math.round(response.data.main.temp);
  let tempFeelsLike = Math.round(response.data.main.feels_like);
  let w = response.data.wind.speed;
  let humidity = response.data.main.humidity;
  let visibility = response.data.visibility / 100;

  let imgToday = document.querySelector("#dayIcon");
  let tempBox = document.querySelector("#tempreature");
  let tempBoxFeelsLike = document.querySelector("#tempFL");
  let windBox = document.querySelector("#wind");
  let humidityBox = document.querySelector("#humidity");
  let visibiltyBox = document.querySelector("#visibility");

  let t = Math.round(response.data.main.temp);
  let tFL = Math.round(response.data.main.feels_like);

  let tB1 = document.querySelector("#temp1");
  let tBFL1 = document.querySelector("#tempFL1");

  let cityName = response.data.name;
  let city = document.querySelector("#cityName");

  imgToday.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  imgToday.setAttribute("alt", response.data.weather[0].description);
  tempBox.innerHTML = temp;
  city.innerHTML = cityName;
  tempBoxFeelsLike.innerHTML = tempFeelsLike;
  windBox.innerHTML = w;
  humidityBox.innerHTML = humidity;
  visibiltyBox.innerHTML = visibility;
}

let citySearch = document.querySelector("form");

citySearch.addEventListener("submit", getInfo);

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

//feauture 3

function tempConvCF(event) {
  event.preventDefault();

  let f = document.querySelector("#F");
  let c = document.querySelector("#C");
  let temp = document.querySelector("#tempreature");
  let temp2 = document.querySelector("#temp2");
  let u = document.querySelector("#unit");
  let u2 = document.querySelector("#unit2");
  let conTemp = parseFloat((temp.innerHTML * 1.8 + 32).toFixed(2));
  let conTemp2 = parseFloat((temp2.innerHTML * 1.8 + 32).toFixed(2));

  if (u.innerHTML.trim() === "°C") {
    return false;
  } else {
    temp.innerHTML = conTemp2;
    temp2.innerHTML = conTemp;
    u.innerHTML = "°C";
    u2.innerHTML = "°C";
    c.setAttribute("style", "text-decoration: underline;");
    f.setAttribute("style", "text-decoration: none;");
  }
}

function tempConvFC(event) {
  event.preventDefault();

  let f = document.querySelector("#F");
  let c = document.querySelector("#C");
  let temp = document.querySelector("#tempreature");
  let temp2 = document.querySelector("#temp2");
  let u = document.querySelector("#unit");
  let u2 = document.querySelector("#unit2");
  let conTemp = parseFloat(((temp.innerHTML - 32) * 0.5556).toFixed(2));
  let conTemp2 = parseFloat(((temp2.innerHTML - 32) * 0.5556).toFixed(2));

  if (u.innerHTML === "°F") {
    return false;
  } else {
    temp.innerHTML = conTemp;
    temp2.innerHTML = conTemp2;
    u.innerHTML = "°F";
    u2.innerHTML = "°F";
    f.setAttribute("style", "text-decoration: underline;");
    c.setAttribute("style", "text-decoration: none;");
  }
}

let c = document.querySelector("#C");
c.addEventListener("click", tempConvCF);

let f = document.querySelector("#F");
f.addEventListener("click", tempConvFC);

let u = document.querySelector("#unit");
if (u.innerHTML.trim() === "°C") {
  c.setAttribute("textDecoration", "underline");
} else {
  f.setAttribute("textDecoration", "underline");
}
