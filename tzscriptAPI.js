// const sourceTZ = document.querySelector('#srcTimeZone');
// const desTZ =  document.querySelector('#desTimeZone');
import { convertTime } from "./calculators.js"

// async function populate () {
//     const {data} = await axios.get('https://worldtimeapi.org/api/timezone');
//     data.forEach((timezone) => {
//         const option = document.createElement('option');
//         option.value = timezone;
//         option.text = timezone;
//         sourceTZ.appendChild(option);
//         desTZ.appendChild(option.cloneNode(true));
//     });
// }

// document.addEventListener('DOMContentLoaded', populate);

document.getElementById('srcTimeZoneArea').addEventListener('change', async () => {
    try {
        const area = document.getElementById('srcTimeZoneArea').value;
        const request = `https://worldtimeapi.org/api/timezone/${area}`;
        const {data} = await axios.get(request);
        const init = document.getElementById('initial')
        if (init) init.remove();
        document.getElementById('srcTimeZoneLocation').innerHTML = '';
        const sourceTZ = document.getElementById('srcTimeZoneLocation');
        data.forEach((timezone) => {
            const option = document.createElement('option');
            option.value = timezone.slice(timezone.indexOf('/') + 1);
            option.text = timezone.slice(timezone.indexOf('/') + 1);
            sourceTZ.appendChild(option);
        });
    }
    catch (error) {
        alert("An error occured!");
        console.log(error);
    }
});


document.getElementById('desTimeZoneArea').addEventListener('change', async () => {
    try {
        const area = document.getElementById('desTimeZoneArea').value;
        const request = `https://worldtimeapi.org/api/timezone/${area}`;
        const {data} = await axios.get(request);
        const init = document.getElementById('initial')
        if (init) init.remove();
        document.getElementById('desTimeZoneLocation').innerHTML = '';
        const sourceTZ = document.getElementById('desTimeZoneLocation');
        data.forEach((timezone) => {
            const option = document.createElement('option');
            option.value = timezone.slice(timezone.indexOf('/') + 1);
            option.text = timezone.slice(timezone.indexOf('/') + 1);
            sourceTZ.appendChild(option);
        });
    }
    catch (error) {
        alert("An error occured!");
        console.log(error);
    }
});

async function getOffSets(srcTimeZone, desTimeZone) {
    try {
        const req1 = `https://worldtimeapi.org/api/timezone/${srcTimeZone}`
        const req2 = `https://worldtimeapi.org/api/timezone/${desTimeZone}`
        const res1 = await axios.get(req1);
        const res2 = await axios.get(req2);
        return [res1.data.utc_offset, res2.data.utc_offset];
    }
    catch (error) {
        console.log("error!!");
    }
}

$(document).ready(function () {
    $("#submitButton").on("click", async (event) => {  
        event.preventDefault();     //prevents reload.
        const time = $("#timefield").val();
        const srcTimeZoneArea = $("#srcTimeZoneArea").val();
        const srcTimeZoneLocation = $("#srcTimeZoneLocation").val();
        const desTimeZoneArea = $("#desTimeZoneArea").val();
        const desTimeZoneLocation = $("#desTimeZoneLocation").val();
        const offsets = await getOffSets(srcTimeZoneArea + "/" + srcTimeZoneLocation, desTimeZoneArea + "/" + desTimeZoneLocation)
        console.log(offsets);
        const result = convertTime(time, offsets[0], offsets[1]);
        document.querySelector("#timeresult").innerHTML = "The time at the selected timezone is <b>" + result + "</b>!";
    })
})


//* The requests work for now, all I need to do is parse data and show it in the result.