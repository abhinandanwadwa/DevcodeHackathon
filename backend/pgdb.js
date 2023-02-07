const { Client } = require('pg');
require('dotenv').config();
const fs = require('fs');

const client = new Client({
  host: 'lin-15952-5171-pgsql-primary.servers.linodedb.net',
  port: 5432,
  user: 'linpostgres',
  password: process.env.pgPassword,
  database: 'devcode',
  ssl  : {
    ca : fs.readFileSync('devcode-ca-certificate.crt')
  }
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));


module.exports = client;