const Pool = require('pg').Pool;
const config = require('./config.json')

const pool = new Pool(config);

const CREDENTIALS = {
    user:"postgres",
    password:"postgres",
    database: "bean_database",
    host: "localhost",
    port: 5432
};

module.exports = pool;