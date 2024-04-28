import zonemap from './DSTzones.json' assert {type: 'json'};



//* Conversion functions:

//? Function to convert the timezone:
function convertTimeZone(currentTimeZone, newTimeZone, hourminI) {
    let currentTimeZoneTime = zonemap[currentTimeZone]              //check object for change factor
    let signC = currentTimeZoneTime[0]                              //to check if time adds to GMT or subtracts
    let hourminC = currentTimeZoneTime.substring(1)               

    //First, convert the given time to GMT time 
    let GMTsecs;
    if (signC == "+") {                                             //plus means its ahead of GMT
        GMTsecs = seconds(hourminI)-seconds(hourminC)              //subtracts seconds and converts back to hour to get back to GMT.
    }
    else {                                                          //minus means its behind of GMT 
        GMTsecs = seconds(hourminI)+seconds(hourminC)
    }
    //At this stage we are at GMT, now we have to convert it to required timezone

    let requiredTimeZone = zonemap[newTimeZone]
    let signR = requiredTimeZone[0]
    let hourminR = requiredTimeZone.substring(1)

    if (signR == "+") {
        return hourmin(GMTsecs + seconds(hourminR));
    }
    else {
        return hourmin(GMTsecs - seconds(hourminR));
    }
}

//& Helper functions:
function seconds(hourmin) {     
    //Converts HH:MM string to seconds
    hourmin = hourmin.split(":") 
    let hour = parseInt(hourmin[0], 10)
    let min = parseInt(hourmin[1], 10)
    return hour*3600 + min*60
}

function hourmin(Seconds) {   
    //Converts seconds to HH:MM string
    let addstring;
    if (Seconds<0) {
        Seconds = Seconds + 86400
        addstring = ", Previous Day"
    }
    else if (Seconds>86400) {
        Seconds = Seconds - 86400
        addstring = ", Next Day"
    } 
    else {
        addstring = ""
    }     

    let hour = Math.floor(Seconds/3600)
    Seconds %= 3600
    let minutes = Math.floor(Seconds/60)
    if (hour === 24 && minutes === 0) {
        return "00:00";
    }
    addstring =  hour.toString().padStart(2,"0") + ":" + minutes.toString().padStart(2,"0") + addstring;
    if (addstring[0] == "0" && addstring[1] == ":") {
        return "0" + addstring;
    }
    return addstring;

}

//* Event functions: (Called if event occurs)

//? EventListener to populate the dropdown menu to get all the timezones
document.addEventListener('DOMContentLoaded' , function () {
    const select = document.getElementsByClassName("dropdown1");

    for (const timezone in zonemap) {
        const option = document.createElement("option");        //creates an option element with addable value and text.
        const option1 = document.createElement("option");
        option.value = timezone;
        option.text = timezone;
        option1.value = timezone;
        option1.text = timezone;
        select[0].appendChild(option);
        select[1].appendChild(option1);
    }
})

//? JQuery to handle inputs
$(document).ready(function () {
    $("#submitButton").on("click", (event) => {  
        event.preventDefault();     //prevents reload.
        let time = $("#timefield").val().replace(/\s/g, "");
        let colon_idx = time.indexOf(":");
        //for X:XX the index is 1
        if (colon_idx == 1) {
            time = "0" + time;      //make it into 0X:XX
        }
        let atime;

        //24hr format has length 5 after accounting for leading 0s
        if (time.length == 5) {
            atime = time;
        }
        
        //12 hr format test 
        else {
            //regex for 12:00am to 12:59 am
            const reg12x =  /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?am$/i;
            if (time.endsWith("pm") || time.endsWith("am")) {

            }
            let h;
            if (reg12x.test(time)) {h = 0;}
            else {h = parseInt(time.substring(0,2));}
            let m = time.substring(3,5);

            if (time.endsWith("pm") && h != 12) {h += 12;}

            let hourstring = h.toString().padStart(2,"0");
            atime = hourstring + ":" + m;

        }
        console.log(atime);
        let stZ = $("#srcTimeZone").val();
        let dtZ = $("#desTimeZone").val();
        let res =  convertTimeZone(stZ, dtZ, atime);
        document.getElementById("timeresult").innerHTML = "The time at the selected timezone is <b>" + res + "</b> !";
        
        
    })
})


