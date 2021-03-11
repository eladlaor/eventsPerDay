'use strict';

const csv = require('csv-parser');
const fs = require('fs');

let eventsArray = []; 

fs.createReadStream('./bh-final.csv')
  .pipe(csv(['date', 'eventName']))
  .on('data', (row) => {
    eventsArray.push(row);
  })
  .on('end', () => {
    let data = JSON.stringify(eventsArray);
    fs.writeFileSync('.parsedData', data);
    console.log('CSV file successfully processed');
  });

