const Pool = require('pg').Pool;

const pool = new Pool({
    user: "linpostgres",
    password: process.env.pgPassword,
    host: 'lin-15897-5147-pgsql-primary.servers.linodedb.net',
    port: 5432,
    database: "devcode"
});

module.exports = pool;