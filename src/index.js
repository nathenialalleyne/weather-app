const cityNameInput = document.querySelector(".search-bar");
const searchButton = document.querySelector(".search-button");
const time = document.querySelector(".date-display");
const timeTiny = document.querySelector(".time");
const date = new Date();

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[date.getDay()];

let dateString = day + ", ";

time.innerHTML = dateString;

searchButton.addEventListener("click", () => {
  let value = cityNameInput.value;
  let weather = weatherAtLocation(value);
  let data = weather.then((results) => {
    console.log(results);
    return results.json();
  });
  weather.catch((err) => {
    console.log("error");
  });
  displayData(data);
});

function displayData(info) {
  info.then((results) => {
    const condition = document.querySelector(".condition-text");
    const city = document.querySelector(".location-name");
    const temp = document.querySelector(".temp-display");
    const rainMeter = document.querySelector(".rain-text");
    const icon = document.querySelectorAll(".condition-icon")[1];

    let unix_timestamp = results.dt;

    let date = new Date(unix_timestamp * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();

    let formattedTime = hours + ":" + minutes.substr(-2);

    console.log(results);

    icon.src =
      "http://openweathermap.org/img/w/" + results.weather[0].icon + ".png";
    rainMeter.innerHTML = "Rain - " + results.rain;
    time.innerHTML = dateString + formattedTime;
    temp.innerHTML = Math.trunc((results.main.temp - 273.15) * 1.8 + 32) + "°F";
    city.innerHTML = results.name + ", " + results.sys.country;
    condition.innerHTML = results.weather[0].main;
  });
  info.catch((err) => {
    console.log(err);
  });
}

async function weatherAtLocation(location) {
  try {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        location +
        "&APPID=7c2be3625138afc41ec0634a75c8d76e"
    );

    return response;
  } catch {
    console.log("failed");
  }
}
