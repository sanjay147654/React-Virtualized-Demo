const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : '192.168.177.135',
  user     : 'root',
  password : 'VSPnad@17',
  port : 3306,
  multipleStatements: true
});

const app = express();

app.use(bodyParser.json())

app.get('/get_report', function (req, res) {

    connection.query('SELECT fms_id,fms_rd_time,fms_rd_data->>"$.temperature" AS temperature,fms_rd_data->>"$.humidity" AS humidity,fms_rd_data->>"$.pm10" AS pm10 FROM phoenzbi_data.flood_monitoring_stations_raw_data LIMIT 500000', function (error, results, fields) {
      if (error) throw error;
      res.send(results)
      res.end();
    });

});
// Start the server
app.listen(3001, () => {
 console.log('Go to http://localhost:3001/get_report to get data of the report');
});