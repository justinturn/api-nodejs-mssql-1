const express = require('express');
const sql = require('mssql');

const app = express();
const port = process.env.PORT || 3000;

const config = {
   user: process.env.DB_USER || 'syteline',
   password: process.env.DB_PASSWORD || 'axhSL01',
   server: process.env.DB_SERVER || 'sql-automation',
   database: process.env.DB_DATABASE || 'axh_jobdata',
}

app.get('/schedule', (req, res) => {
   const productQuery = `select jobNum,netPrice,MfgShipDate from ProdSchedSW_UnitDates_View where prod_status = 'M'`
   const request = new sql.Request();
   request.query(productQuery, (err, result) => {
      if (err) res.status(500).send(err);
      res.send(result);
   });
});

sql.connect(config, err => {
   if (err) {
      console.log('Failed to open a SQL Database connection.', err.stack);
      process.exit(1);
   }
   app.listen(port, () => {
      console.log(`App is listening at http://localhost:${port}`);
   });
});