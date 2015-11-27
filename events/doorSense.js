module.exports = {
    Door: function(hubID, sensorID) {
        this.hubID = hubID;
        this.sensorID = sensorID;

        this.doorFunc = function (data) {
            if (data == 1) {
                console.log("open");
            } else if (data == 0) {
                console.log("close");
            }
        };
    }
};
