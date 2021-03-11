'use strict';

const fs = require('fs');

const UTCtoPST = (-8);

let records = JSON.parse(
    fs.readFileSync('.parsedData')
);

const numOfRecords = records.length;

for (let i = 0; i < numOfRecords; ++i) { // i can probably do it more elegantly
    let date = new Date(records[i].date);
    date.setHours(date.getHours() + UTCtoPST);
    records[i].date = date;
}
 
let convertedFile = JSON.stringify(records);
fs.writeFileSync('.dataInPST', convertedFile);