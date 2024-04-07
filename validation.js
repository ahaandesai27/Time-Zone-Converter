function checkTime() {
    const userInput = $("#timefield").val().replace(/\s/g, "");               

    const timeRegex = /^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$|^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(am|pm)$/i;


   if (!timeRegex.test(userInput)) {
        alert("User input is not valid!");
        location.reload();
   }
}

