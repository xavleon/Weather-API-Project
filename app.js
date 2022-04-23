const express = require("express");
const { json } = require("express/lib/response");
const https = require("https");
const { url } = require("inspector");
const bodyParser = require("body-parser");
const app = express();
port = 3000;

app.listen(3000, function () {
  console.log("Server is online on port " + port);
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "7b3370431494faf9d64bfd7767792a9b";
  const unit = "imperial";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&units=" +
    unit +
    "&appid=" +
    apiKey;
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      console.log(temp);
      console.log(weatherDescription);
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write(
        "<h1>The description of the weather is currently " + weatherDescription
      );
      res.write("<h1>The Current Temperature in " + query + " is " + temp);
      res.write("<br><img src=" + imageURL + ">");
      res.send();
    });
  });
});

//res.send("server is up and running");
