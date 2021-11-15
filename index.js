const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

// set up express app
const app = express(process.env.MONGO);

// connect to mongodb
mongoose.connect();
mongoose.Promise = global.Promise;

//set up static files
app.use(express.static("public"));

// use body-parser middleware
app.use(bodyParser.json());

// initialize routes
app.use("/api", require("./routes/api"));

// error handling middleware
app.use(function (err, req, res, next) {
	console.log(err); // to see properties of message in our console
	res.status(422).send({ error: err.message });
});

// listen for requests
app.listen(process.env.PORT || 5000, function () {
	console.log("now listening for requests");
});
