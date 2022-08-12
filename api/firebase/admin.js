const admin = require("firebase-admin")

admin.initializeApp({
  credential: admin.credential.cert("./service-account.json"),
})

module.exports = admin;