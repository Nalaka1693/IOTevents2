module.exports = {
    Motion: function(hubID, sensorID) {
        this.hubID = hubID;
        this.sensorID = sensorID;
        this.interval = 5000;
        var dataArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        this.motionFunc = function(data) {
            fillArray(data, dataArray);

            if (eval(dataArray.join('+')) > 1) {
                var date = new Date();
                printDate(date, sensorID);
            }
        };
    }
};

function printDate(date, num) {
    console.log("Motion detected on motion sensor No: " + num + " on " + date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " at " +
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}

function fillArray(data, dataArray) {
    for (var i = dataArray.length-1; i >= 0 ; i--) {
        dataArray[i] = dataArray[i-1];
    }
    dataArray[0] = data;
}
