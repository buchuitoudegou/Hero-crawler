import sqlconfig from './MysqlConfig';
import mysql from 'mysql';
import queryModel from './queryHero';

const dbConnection = mysql.createConnection(sqlconfig);

dbConnection.connect(function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('hero database is connected.');
  }
});

export default dbConnection;
export const model = queryModel;
