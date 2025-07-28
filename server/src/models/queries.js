const pool = require('./pool')

async function get_all_messages() {
    const {rows} = await pool.query("SELECT * FROM \"Message\";");
    return rows;
}

module.exports = {
    get_all_messages,
}