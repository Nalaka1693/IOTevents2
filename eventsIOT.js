var express = require('express');

var motionSense = require('./events/motionSense');
var doorSense = require('./events/doorSense');
var tempSense = require('./events/tempSense');
var humidSense = require('./events/humidSense');
var tankWaterSense = require('./events/tankWaterSense');
var acceleSense = require('./events/acceleSense');

var router = express.Router();

var motionArray = [];

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

    for (var i = 0; i < motionArray.length; i++) {
        if (motionArray[i].hubID == hubid && motionArray[i].sensorID == sensorid) {
            motionArray[i].interval = interval;
            break;
        }
    }
});
router.get('/mdata/:hubid/:sensorid/:data', function(req, res) {
    var hubid = req.params.hubid;
    var sensorid = req.params.sensorid;
    var data = req.params.data;

    for (var i = 0; i < motionArray.length; i++) {
        if (motionArray[i].hubID == hubid && motionArray[i].sensorID == sensorid) {
            break
        }
    }
    setInterval(function() {
        motionArray[i].motionFunc(data);
    }, motionArray[i].interval);
});


module.exports = router;