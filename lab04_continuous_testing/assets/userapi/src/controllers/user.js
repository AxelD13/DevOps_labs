const client = require('../dbClient')

module.exports = {
  create: (user, callback) => {
    // Check parameters
    if(!user.username)
      return callback(new Error("Wrong user parameters"), null)
    // Create User schema
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname
    }
    // Save to DB
    // TODO check if user already exists
    client.hmset(user.username, userObj, (err, res) => {
      if (err) return callback(err, null)
      callback(null, res) // Return callback
    })
  },

  get: (username, callback) => {
    // Check if user exists
    client.exists(username, (err, res) => {
      if(res === 1) {
        client.hmget(username, 'firstname', 'lastname', (err, res) => {
          if (err) return callback(err, null)
          callback(null, res) // Return callback
        })
      } else {
        return callback(new Error("User does not exist"), null)
      }
    })
  }
}
