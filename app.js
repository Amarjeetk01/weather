const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render("index");
});

app.get("/weatherReport", function (req, res) {
    res.sendFile(__dirname + "/pages/weather.html");
});

app.post("/", function (req, res) {
    var countryName = req.body.country;
    var zipCode = req.body.pincode;
    const api = "939ce23cfdb7fd5d02c93311f8b6c5ed";
    const url =
        "https://api.openweathermap.org/data/2.5/weather?zip=" +
        zipCode +
        "," +
        countryName +
        "&appid=" +
        api +
        "&units=metric";

    https.get(url, function (response) {
        let weatherData = "";
        response.on("data", function (data) {
            weatherData += data;
        });

        response.on("end", function () {
            const parsedWeatherData = JSON.parse(weatherData);
            const temp = parsedWeatherData.main.temp;
            const weatherDescription = parsedWeatherData.weather[0].description;
            const queryName = parsedWeatherData.name;
            const windSpeed=parsedWeatherData.wind.speed;
            const humidity=parsedWeatherData.main.humidity;

            res.render("weather", {
                windSpeed:windSpeed,
                humidity:humidity,
                temp: temp,
                weatherDescription: weatherDescription,
                queryName: queryName,
                countryName: req.body.country,
            });
        });
    });
});


app.listen(3000, function () {
    console.log("Server is running on 3000 port!");
});
