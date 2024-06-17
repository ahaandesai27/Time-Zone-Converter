export function convertTime(time, srcTimeZone, desTimeZone) {
    if (srcTimeZone === desTimeZone) {
        return time;
    }

    //& Helper function to convert time string to seconds since midnight
    function seconds(timeStr) {
        const [hours, minutes] = timeStr.split(":").map(Number);
        return hours * 3600 + minutes * 60;
    }

    //& Helper function to convert seconds since midnight back to time string
    function hourmin(seconds) {
        const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    //& Parse offsets from the time zone strings
    function parseOffset(timeZone) {
        const sign = timeZone[0] === '-' ? -1 : 1;
        const [hours, minutes] = timeZone.slice(1).split(":").map(Number);
        //+05:30 -> 5, 30
        return sign * (hours * 3600 + minutes * 60);
    }

    try {
        let timePeriod;
        if (time.includes("pm") || time.includes("am")) {
            timePeriod = time.slice(-2);
            time = time.slice(0,-2);

            if (timePeriod == 'pm') {
                time = time.split(":");
                time[0] = (parseInt(time[0]) + 12).toString();
                time = time.join(":");
            }
        }
        let timeInSeconds = seconds(time);
        let srcOffset = parseOffset(srcTimeZone);
        let desOffset = parseOffset(desTimeZone);

        let gmtSeconds = timeInSeconds - srcOffset;
        let desTimeInSeconds = gmtSeconds + desOffset;

        desTimeInSeconds = ((desTimeInSeconds % 86400) + 86400) % 86400;        //ensuring within 24 hr bounds 

        // Convert the seconds back to HH:MM format
        return hourmin(desTimeInSeconds);
    } catch (error) {
        console.error(error);
        return "An error occured";
    }
}
