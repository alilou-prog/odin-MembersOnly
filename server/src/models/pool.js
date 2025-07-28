const {Pool} = require("pg");
module.exports = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    // connectionString: process.env.DB_URL
})