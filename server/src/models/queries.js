const pool = require('./pool')

async function get_all_messages() {
    const { rows } = await pool.query("SELECT * FROM \"Message\";");
    return rows;
}

async function create_user(user) {
    await pool.query(`INSERT INTO \"User\" (first_name, last_name, username, is_admin, password, salt)
        VALUES
            ($1, $2, $3, $4, $5, $6)`,
        [
            user.first_name,
            user.last_name,
            user.username,
            user.is_admin,
            user.password,
            user.salt,
        ])
}

module.exports = {
    get_all_messages,
    create_user
}