const pool = require('./pool')

async function get_username(user_id) {
    const { rows } = await pool.query(`SELECT username FROM \"User\" WHERE id = $1`, [user_id]);
    return rows[0].username;
}

async function get_all_messages() {
    const { rows } = await pool.query("SELECT * FROM \"Message\";");
    const update_rows = await Promise.all(rows.map(async (message) => { return { ...message, author: await get_username(message.user_id) } }))
    return update_rows;
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

async function set_member(user_id) {
    await pool.query(`UPDATE \"User\" 
    SET is_member = true WHERE id = $1`,
        [user_id])
}

async function create_message(message) {
    await pool.query(`INSERT INTO "Message" (title, text, user_id)
        VALUES
        ($1, $2, $3)`, [message.title, message.text, message.user_id])
}

async function update_message(message) {
    await pool.query(`UPDATE "Message"
        SET title = $1, text = $2 WHERE id = $3`,
        [message.title, message.text, message.id])
}

async function delete_message(id) {
    await pool.query(`DELETE FROM "Message" WHERE id = $1`, [id])
}

module.exports = {
    get_all_messages,
    create_user,
    set_member,

    create_message,
    delete_message,
    update_message,
}