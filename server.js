// var express = require('./config/express');
// const app = express;
// const cors = require('cors')

// var corsOptions = {
//   origin: '*',
//   optionsSuccessStatus: 200 
// }
// app.use(cors(corsOptions));

// var port = process.env.PORT || 3000;
    
// app.listen(port, function(){
//     console.log('Server ON in Port' + port);
// })

///////////////////////////////////////////TEST BELOW
const express = require('express');
const cors = require('cors');
const personController = require('.//app/controllers/person.controller')
const sql = require('mssql');

const app = express();

// Enable CORS for all routes
app.use(cors());
// ... Rest of your server code ...
// respond with "hello world" when a GET request is made to the homepage
async function GetValueFunction() {
    let result = await personController.read();
    return result;
}

const config = {
  user: process.env.DB_USER || 'syteline',
  password: process.env.DB_PASSWORD || 'axhSL01',
  server: process.env.DB_SERVER || 'sql-automation',
  database: process.env.DB_DATABASE || 'axh_jobdata',
}

app.get('/schedule', (request, response) => {
  getSched().then((data) => {
    response.json(data[0]);
  })
  });

async  function  getSched() {
  try {
    let  pool = await  sql.connect(config);
    let  products = await  pool.request().query("select  top(20) jobNum,netPrice,MfgShipDate from ProdSchedSW_UnitDates_View where prod_status = 'M'");
    return  products.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}
//Works but response is not the structure desired
// app.get('/schedule', (req, res) => {
//   const productQuery = `select  top(20) jobNum,netPrice,MfgShipDate from ProdSchedSW_UnitDates_View where prod_status = 'M'`
//   const request = new sql.Request();
//   sql.connect(config, err => {
//     if (err) {
//        console.log('Failed to open a SQL Database connection.', err.stack);
//        process.exit(1);
//     }})
//   request.query(productQuery, (err, result) => {
//      if (err) res.status(500).send(err);
//      res.send(result);
//   });
// });

  app.get('/', (req, res) => {
    res.send('hello im home')
  })

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
