const sql = require('mssql')

//'mssql://User:Password@ComputerName/\Instance/DatabaseName'
//Following example:
const config = 'mssql://syteline:axhSL01@sql-automation/\MSSQLSERVER/AXH_JobData';

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to SQLServer...');
    return pool;
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err));

module.exports = {
  sql, poolPromise
};