const apiKey = "40b1d87cdfa004a7eb73de0a0128c504";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`
const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");
const weatherIcon = document.querySelector(".weather-icon");
const weather = document.querySelector(".weather");
const error = document.querySelector(".error");
const timeElement = document.querySelector(".time");
const dateElement= document.querySelector(".date");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status == 404) {
        error.style.display = "block";
        weather.style.display = "none";
    }

    const data = await response.json();
    console.log(data, "data");

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "assets/clouds.png";
    } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "assets/clear.png";
    } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "assets/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "assets/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "assets/mist.png";
    } else if (data.weather[0].main == "Snow") {
        weatherIcon.src = "assets/snow.png";
    }

    weather.style.display = "block";
    error.style.display = "none";
}

searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkWeather(searchInput.value);
        searchInput.value = "";
    }
});

searchButton.addEventListener("click", () => {
    checkWeather(searchInput.value);
    searchInput.value = "";
});

function formatTime(date) {
    const hours12 = date.getHours();
    const minutes = date.getMinutes();
    const isAm = date.getHours() < 12;

    return `${hours12.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")} `;
}


function formatDate(date) {
    const DAYS = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    const MONTHS = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    return `${DAYS[date.getDay()]}, ${
        MONTHS[date.getMonth()]
    } ${date.getDate()} ${date.getFullYear()}`;
}

setInterval(() => {
    const now = new Date();

    timeElement.textContent = formatTime(now);
    dateElement.textContent = formatDate(now);
}, 200);




