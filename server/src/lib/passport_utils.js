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

module.exports = {
    valid_password, 
    gen_password
}