const utils = {
    msToHMS: function(millisec){
            var seconds = (millisec / 1000).toFixed(0);
    var minutes = Math.floor(seconds / 60);
    var hours = "";
    if (minutes > 59) {
        hours = Math.floor(minutes / 60);
        hours = (hours >= 10) ? hours : "0" + hours;
        minutes = minutes - (hours * 60);
        minutes = (minutes >= 10) ? minutes : "0" + minutes;
    }

    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    if (hours != "") {
        return hours + ":" + minutes + ":" + seconds;
    }
    return minutes + ":" + seconds;
    },
    HMSToMs: function(hms){
        //currently ununused
        //'02:20:16' ->
        var p = hms.split(':');
        var milliseconds = 0;
        milliseconds += p[0] * 3600000;
        milliseconds += p[1] * 60000;
        milliseconds += p[2] * 1000;

        return Int(milliseconds);
    }
}

export default utils;