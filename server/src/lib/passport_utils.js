const crypto = require('crypto')

function gen_password(password) {
  const salt = crypto.randomBytes(32).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')

  return {
    salt, hash
  }
}

async function valid_password(password, hash, salt) {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex') === hash;
}

function is_auth(req, res, next) {
  if(req.isAuthenticated()) {
    next()
  }
  else {
    res.status(401).json({err: "Not authenticated"})
  }
}

function auth_action(fn) {
  return [is_auth, fn]
}

module.exports = {
  auth_action,
  valid_password,
  gen_password
}