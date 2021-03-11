'use strict';

const fs = require('fs');
const express = require("express");
const app = express();

let records = JSON.parse(
    fs.readFileSync('.parsedData')
);

let arrOfDates = [];

let numOfRecords = records.length;

let fullFirstDate = new Date((records[0].date));
let parsedFirstDay = fullFirstDate.toString().substr(0, 15);

let firstEventCounter = {
    [records[0].eventName]: 0
}

let dayAsObject = {
    [parsedFirstDay]: firstEventCounter
}

let distinctDaysCounter = 0;

arrOfDates.push(dayAsObject);
    
for (let i = 1; i < numOfRecords; ++i) {
    let fullDate = new Date(records[i].date);
    let parsedDay = fullDate.toString().substr(0, 15);
    let eventName = records[i].eventName;

    // if we are now at an event that is at an already known date
    if (Object.keys(arrOfDates[distinctDaysCounter]) == parsedDay) {

        // if there already was such an event
        if (arrOfDates[distinctDaysCounter][parsedDay].hasOwnProperty(eventName)) {
            arrOfDates[distinctDaysCounter][parsedDay][eventName] += 1;
        } else {
            arrOfDates[distinctDaysCounter][parsedDay][eventName] = 0;
        }
    } else {
        let firstEventForTheDay = {
            [eventName]: 0
        };

        let newDay = {
            [parsedDay]: firstEventForTheDay
        };

        arrOfDates.push(newDay);
        ++distinctDaysCounter;
    }
}

console.log(arrOfDates);
let resultFile = JSON.stringify(arrOfDates);
fs.writeFileSync('.eventsPerDay', resultFile);

app.get("/", (req, res) => {
    const data = JSON.parse(fs.readFileSync('.eventsPerDay'));
    res.send(data);
})

app.listen(3000, () => {
    console.log('eventsCounter is now listening at port 3000');
});