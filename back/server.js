'use strict';
// Import the different tools usefuul for the app
const express = require('express');
const app = express();
const config = require('config/package');
const bodyParser = require('body-parser');
const boom = require('@hapi/boom');
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose');

// Define the app port
const port = process.env.PORT || 3000;

// Set mongoose instances
mongoose.Promise =  global.Promise;
mongoose.connect('mongodb://localhost/countOfMoneyDB', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('DB Connected');
        }
    )
    .catch(err => {
        console.log('Db Connection Error ' + err.message);
    });

// Set the app configuration*
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Define the global rooter
app.use("/api", require("./api/routes/rooter.js"));

app.use(function (err, req, res, next) {
    if (!err.isBoom) {
       err = boom.internal("Internal server error");
   }
    // Set the output status
    res.status(err.output.statusCode);
    res.json(err.output.payload);
});

// Listen the app port
app.listen(port);

console.log('Count of money api server started on:' + port);
