module.exports = {
    Temp: function(hubID, sensorID) {
        this.hubID = hubID;
        this.sensorID = sensorID;
        this.interval = 2000;
        var dataArray = [30, 30, 30, 30, 30, 30, 30, 30, 30, 30];

        this.tempFunc = function(data) {
            fillArray(data, dataArray);

            if (dataArray[0] > 40) {
                console.log("Caution! temperature is extremely high");
            } else if (dataArray[0] > dataArray[1] &&  dataArray[1] > dataArray[2] &&  dataArray[2] > dataArray[3]) {
                console.log("Caution! temperature is rising rapidly");
            } else if (dataArray[0] - dataArray[1] > 5) {
                console.log("Caution! may be a fire go to a safe place");
            }
        };
    }
};

function fillArray(data, dataArray) {
    for (var i = dataArray.length-1; i >= 0 ; i--) {
        dataArray[i] = dataArray[i-1];
    }

    dataArray[0] = data;
}
