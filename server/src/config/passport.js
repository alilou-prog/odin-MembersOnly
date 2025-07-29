const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const pool = require('../models/pool')

const {valid_password} = require("../lib/passport_utils")

async function verfiy_cb(username, password, done) {
  const {rows} = await pool.query("SELECT * FROM \"User\" WHERE username = $1", [username])
  const user = rows[0]

  if(!user) {
    return done(null, false, {message: "Incorrect username"})
  }
  const is_valid = valid_password(password, user.hash, user.salt)
  if(!is_valid) {
    return done(null, false, {message: "Incorrect password"})
  }
  return done(null, user);
}

passport.use(new LocalStrategy(verfiy_cb));


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM \"User\" WHERE id = $1", [id]);
    const user = rows[0];
    done(null, user);
  } catch (err) {
    done(err);
  }
});


module.exports = passport;