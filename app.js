var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var JWT = require('jwt-simple');
var http = require('http');
var multer = require('multer');
var fs = require('fs');
var AWS = require('aws-sdk');
var crypto = require('crypto');
var wordpress = require("wordpress");
var debug = require('debug')('express-urlrewrite');
var toRegexp = require('path-to-regexp');
var URL = require('url');


import Command from '@oclif/command'

export class MyCommand extends Command {
    static description = 'description of this example command'

    async run() {
        console.log('running my command')
    }
}


function parallel(middlewares) {
    return function (req, res, next) {
        async.each(middlewares, function (mw, cb) {
            mw(req, res, cb);
        }, next);
    };
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(function (err, req, res, next) {
    if (err.constructor.name === 'UnauthorizedError') {
        res.status(401).send('Unauthorized');
    }
});

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');




// HTML PAGES


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/home.html');
});


// ===================================== CONNECTING TO PORT =======================================


const PORT = process.env.PORT || 7070;
app.listen(PORT);
console.log("Server connected to port" + " " + PORT);