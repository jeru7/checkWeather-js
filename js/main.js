const searchBtn = document.querySelector("#searchBtn");
const searchInput = document.querySelector("#searchInput");

searchBtn.addEventListener("click", showDisplay);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    showDisplay();
  }
});

async function showDisplay() {
  const key = "ef5a97c2c2d6478f967102032231011";
  const searchValue = document.querySelector("#searchInput").value;
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${searchValue}&days=1&aqi=no&alerts=no`;

  if (searchValue.trim() === "") {
    alert("Please enter a city name");
    return;
  }

  try {
    const response = await fetch(url);
    if (response.status !== 200) {
      throw new Error("Invalid city name");
      return;
    } else {
      const data = await response.json();
      const displayCard = document.querySelector(".card__display");
      displayCard.style.display = "grid";
      updateInfo(data);
    }
  } catch (error) {
    alert(error);
  }
}

function updateInfo(data) {
  const cityName = data.location.name;
  const temp = data.current.temp_c;
  const condition = data.current.condition.text;
  const humidity = data.current.humidity;
  const wind = data.current.wind_kph;
  const rainChance = data.forecast.forecastday[0].day.daily_chance_of_rain;
  const iconUrl = data.current.condition.icon;

  const weatherIcon = document.querySelector(".card__weatherIcon");
  weatherIcon.src = iconUrl;

  const weatherCelcius = document.querySelector(".card__displayLeft__celcius");
  weatherCelcius.textContent = temp + "°";

  const weatherCondition = document.querySelector(
    ".card__displayLeft__weather"
  );
  weatherCondition.textContent = condition;

  const city = document.querySelector(".card__displayLeft__cityName");
  city.textContent = cityName;

  const humidityValue = document.querySelector("#humidity");
  humidityValue.textContent = humidity + "%";

  const windValue = document.querySelector("#wind");
  windValue.textContent = wind + "km/h";

  const rainChanceValue = document.querySelector("#rainChance");
  rainChanceValue.textContent = rainChance + "%";
}
