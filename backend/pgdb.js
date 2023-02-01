const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: process.env.pgPassword,
    host: 'localhost',
    port: 5432,
    database: "devcode"
});

module.exports = pool;