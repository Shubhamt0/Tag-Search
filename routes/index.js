var express = require('express');
var router = express.Router();
const util = require('util');
var bodyParser = require('body-parser');
var app = express();
let db = require('../config/db.config');
var Sequelize = require('sequelize');


app.use(bodyParser.json());


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


var xlsx = require('node-xlsx');
var fs = require('fs');
var obj = xlsx.parse('HTML Tags.xlsx'); // parses a file
var rows = [];
var writeStr = "";

//looping through all sheets
for(var i = 0; i < obj.length; i++)
{
    var sheet = obj[i];
    //loop through all rows in the sheet
    for(var j = 0; j < sheet['data'].length; j++)
    {
            //add the row to the rows array
            rows.push(sheet['data'][j]);
    }
}

//creates the csv string to write it to a file
for(var i = 0; i < rows.length; i++)
{
    writeStr += rows[i].join(",") + "\n";
}

//writes to a file, but you will presumably send the csv as a      
//response instead
fs.writeFile("out.csv", writeStr, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("out.csv was saved in the current directory!");
});





const csv = require('fast-csv');
var fs = require('fs');

// Import CSV Data to MySQL database
importCsvData2MySQL('out.csv');

function importCsvData2MySQL(filename){
    let stream = fs.createReadStream(filename);
    let csvData = [];
    let csvStream = csv
        .parse()
        .on("data", function (data) {
            csvData.push(data);
            console.log(data);
        })
        

        .on("end", function () {
            // Remove Header ROW
            csvData.shift();
/*
            // Open the MySQL connection
            Sequelize((error) => {
                if (error) {
                    console.error(error);
                } else {
                    let query = 'INSERT INTO tags (Tag_name, Description) VALUES ?';
                    Sequelize.query(query, [csvData], (error, response) => {
                        console.log(error || response);
                    });
                }
            }); */
        });

    stream.pipe(csvStream);
}


module.exports = router;
