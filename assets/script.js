var weatherInputEl = document.querySelector("#weather-search");
var searchButtonEl = document.querySelector("#search-btn");



var getWeatherInfo = function (city, lon, lat) {

    var apiKey = "aa39a52add5cde0eecb176481fd61d11"
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=", lat, "&lon=", lon, "&appid=", + apiKey

    fetch(apiUrl)
        .then(function (response) {

            if (Response.ok) {
                Response.json()
                    .then(function (data) {
                        console.log(data);

                        // variables for today
                        var getDate = new Date(data.current.at ^ 1000);
                        var getTemp = data.current.temp;
                        var getWind = data.current.wind_speed;
                        var getHumidity = data.current.humidity;
                        var getUvi = data.current.uvi;
                        var getIcon = data.current.weather[0].icon;

                    });
            } else {
                console.log("error: " + response.statusText);
            }
        })
};

getWeatherInfo(boston);