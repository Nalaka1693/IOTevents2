var express = require('express');

var motionSense = require('./events/motionSense');
var doorSense = require('./events/doorSense');
var tempSense = require('./events/tempSense');
var humidSense = require('./events/humidSense');
var tankWaterSense = require('./events/tankWaterSense');
var acceleSense = require('./events/acceleSense');

var router = express.Router();

var motionArray = [];
var tempArray = [];
var doorArray = [];

router.get('/newmotion/:hubid/:sensorid', function(req, res) {
    var hubid = req.params.hubid;
    var sensorid = req.params.sensorid;

    var motionSensor = new motionSense.Motion(hubid, sensorid);
    motionArray.push(motionSensor);
    res.send("new motion");

    console.log(motionArray.length);
});
router.get('/minterval/:hubid/:sensorid/:interval', function(req, res) {
    var hubid = req.params.hubid;
    var sensorid = req.params.sensorid;
    var interval = req.params.interval;

    var found = 0;
    for (var i = 0; i < motionArray.length; i++) {
        if (motionArray[i].hubID == hubid && motionArray[i].sensorID == sensorid) {
            found = 1;
            break;
        }
    }
    if (found == 1) {
        motionArray[i].interval = interval;
    } else {
        res.send('Error');
    }
});
router.get('/mdata/:hubid/:sensorid/:data', function(req, res) {
    var hubid = req.params.hubid;
    var sensorid = req.params.sensorid;
    var data = req.params.data;

    var found = 0;
    for (var i = 0; i < motionArray.length; i++) {
        if (motionArray[i].hubID == hubid && motionArray[i].sensorID == sensorid) {
            found = 1;
            break;
        }
    }
    if (found == 1) {
        setInterval(function() {
            motionArray[i].motionFunc(data);
        }, motionArray[i].interval);
    } else {
        res.send('Error');
    }

});

router.get('/newtemp/:hubid/:sensorid', function(req, res) {
    var hubid = req.params.hubid;
    var sensorid = req.params.sensorid;

    var tempSensor = new tempSense.Temp(hubid, sensorid);
    tempArray.push(tempSensor);
    res.send("new temp");

    console.log(tempArray.length);
});
router.get('/tdata/:hubid/:sensorid/:data', function(req, res) {
    var hubid = req.params.hubid;
    var sensorid = req.params.sensorid;
    var data = req.params.data;

    var found = 0;
    for (var i = 0; i < tempArray.length; i++) {
        if (tempArray[i].hubID == hubid && tempArray[i].sensorID == sensorid) {
            found = 1;
            break;
        }
    }
    if (found == 1) {
        setInterval(function() {
            tempArray[i].tempFunc(data);
        }, tempArray[i].interval);
    } else {
        res.send('Error');
    }

});

router.get('/newdoor/:hubid/:sensorid', function(req, res) {
    var hubid = req.params.hubid;
    var sensorid = req.params.sensorid;

    var doorSensor = new doorSense.Door(hubid, sensorid);
    doorArray.push(doorSensor);
    res.send("new temp");

    console.log(doorArray.length);
});
router.get('/ddata/:hubid/:sensorid/:data', function(req, res) {
    var hubid = req.params.hubid;
    var sensorid = req.params.sensorid;
    var data = req.params.data;

    var found = 0;
    for (var i = 0; i < doorArray.length; i++) {
        if (doorArray[i].hubID == hubid && doorArray[i].sensorID == sensorid) {
            found = 1;
            break;
        }
    }
    if (found == 1) {
        setInterval(function() {
            tempArray[i].tempFunc(data);
        }, tempArray[i].interval);
    } else {
        res.send('Error');
    }
});

module.exports = router;