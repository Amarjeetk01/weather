
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");


    // const api="939ce23cfdb7fd5d02c93311f8b6c5ed";
    // const query = "841208"
    // const url="https://api.openweathermap.org/data/2.5/weather?zip="+query+",IN&appid="+api+"&units=metric";
    // https.get(url,function(response){
    //     // console.log(response.statusCode);
    //     response.on("data",function(data){
    //         const weatherData = JSON.parse(data)
    //         const temp = weatherData.main.temp
    //         const weatherDescription = weatherData.weather[0].description
    //         // const icon = weatherData.weather[0].icon
    //         const queryName =weatherData.name
    //         // const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
    //         // we can use only one res.send() but we can write multiple res.write()
    //         // res.send(`The temperature of zip=144027,IN is ${temp} degree celcius.`);
    //         res.write("The temperature of "+queryName+" ,IN is "+temp+" degree celcius.");
    //         res.write("\nThe weather is currently "+weatherDescription+".");
    //         // res.write("<img scr="+imageUrl+">");
    //         res.send();
    //     })
    // })
});

// app.post("/", function (req, res) {
//     var countryName = req.body.country;
//     var zipCode = req.body.pincode;
//     const api = "939ce23cfdb7fd5d02c93311f8b6c5ed";
//     const url = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + ","+countryName+"&appid=" + api + "&units=metric";
//     https.get(url, function (response) {
//         // console.log(response.statusCode);

//         response.on("data", function (data) {
//             const weatherData = JSON.parse(data)
//             const temp = weatherData.main.temp;
//             const weatherDescription = weatherData.weather[0].description;
//             // const icon = weatherData.weather[0].icon
//             const queryName = weatherData.name
//             // const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
//             // we can use only one res.send() but we can write multiple res.write()
//             // res.send(`The temperature of zip=144027,IN is ${temp} degree celcius.`);

//             // res.write("<p>The temperature of <b>" + queryName + "</b> ,<b>"+countryName+"</b> is <b>" + temp + "</b> degree celcius.</p>");
//             // res.write("<p>\nThe weather is currently <b>" + weatherDescription + "</b>.</p>");
//             // // res.write("<img scr="+imageUrl+">");
//             // res.send();
            
//         })
//     })
// })

app.post("/", function (req, res) {
    var countryName = req.body.country;
    var zipCode = req.body.pincode;
    const api = "939ce23cfdb7fd5d02c93311f8b6c5ed";
    const url = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + ","+countryName+"&appid=" + api + "&units=metric";
    https.get(url, function (response) {
        // console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const queryName = weatherData.name;

            // Prepare the weather information as HTML content for the card
            const weatherInfoHTML = `
                <div class="card-body">
                    <h2 class="card-title">Weather Information</h2>
                    <p class="card-text">The temperature of <b>${queryName}</b>, <b>${countryName}</b> is <b>${temp}</b> degree Celsius.</p>
                    <p class="card-text">The weather is currently <b>${weatherDescription}</b>.</p>
                </div>
            `;

            // Generate the full card HTML and send it as the response
            const cardHTML = `
                <div class="card" style="width: 18rem;">
                    ${weatherInfoHTML}
                </div>
            `;

            // Send the card HTML as the response
            res.send(cardHTML);
        })
    })
})


app.listen(3000, function () {
    console.log("Server is running on 3000 port!");
})