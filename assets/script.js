var weatherInputEl = document.querySelector("#weather-search");
var searchButtonEl = document.querySelector("#search-btn");
var weatherContainerEl = document.querySelector("#weather-container");


var cityLocation = function () {
    console.log("hello,world!");
};

var submitWeatherHandler = function (event) {
    event.preventDefault();
    // pull the value from the input form
    var cityWeather = weatherInputEl.value.trim();

    if (cityWeather) {
        // run the city through the api fetch
        getWeatherInfo(cityWeather);
        weatherInputEl.value = "";

    }
    else {
        alert("Enter a city name");
    };
};

var cityLocation = function (city) {

    var apiKey = "aa39a52add5cde0eecb176481fd61d11"
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units-imperial&appid=" + apiKey

    fetch(apiUrl)
        .then(function (response) {

            if (Response.ok) {
                Response.json()
                    .then(function (data) {
                        var lon = data.coord.lon;
                        var lat = data.coord.lat;

                        getWeatherInfo(city, lon, lat);
                    });
            } else {
                console.log("error: " + response.statusText);
            }
        })
};

function cityButton(event) {
    event.preventDefault();
    var city = weatherInputEl.value.trim();

    cityLocation(city);
};

// fetch function to get the city weather information
var getWeatherInfo = function (city, lon, lat) {

    var apiKey = "aa39a52add5cde0eecb176481fd61d11"
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&?lon=" + lon + "&units-imperial&exclude-minutely,hourly,alerts&appid=" + apiKey

    fetch(apiUrl)
        .then(function (response) {

            if (Response.ok) {
                Response.json()
                    .then(function (data) {
                        console.log(data);

                        // variables for today
                        var getDate = new Date(data.current.dt);
                        var getTemp = data.current.temp;
                        var getWind = data.current.wind_speed;
                        var getHumidity = data.current.humidity;
                        var getUvi = data.current.uvi;
                        var getIcon = data.current.weather[0].icon;

                        // create HTML elements
                        var weather = document.createElement("div");

                        var cityEl = document.createElement("h2");
                        cityEl.textContent = weatherInputEl;

                        var dateEl = document.createElement("h2");
                        dateEl.textContent = city + " " + "( " + getDate + " )";

                        var weatherIconEl = document.createElement("img");
                        weatherIconEl.setAttribute("src", getIcon);

                        var tempEl = document.createElement("p");
                        tempEl.textContent = "Temp: " + getTemp;

                        var windEl = document.createElement("p");
                        windEl.textContent = "Wind: " + getWind;

                        var humidityEl = document.createContent("p");
                        humidityEl.textContent = "Humidity: " + getHumidity;

                        var uviEl = document.createElement("p");
                        uviEl.textContent = "UV Index: " + getUvi;

                        // append elements to the div
                        weather.appendChild(cityEl);
                        weather.appendChild(dateEl);
                        weather.appendChild(weatherIconEl);
                        weather.appendChild(tempEl);
                        weather.appendChild(windEl);
                        weather.appendChild(humidityEl);
                        weather.appendChild(uviEl);

                        // append the div to the page
                        weatherContainerEl.innerHTML = "";
                        weatherContainerEl.appendChild(weather);
                    });
            } else {
                console.log("error: " + response.statusText);
            }
        })
};

getWeatherInfo(city);
searchButtonEl.addEventListener("click", submitWeatherHandler);