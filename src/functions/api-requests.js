const axios = require("axios")
const auth = require("./auth")

module.exports = {
  updateAPIAuth,
  axios
}

async function updateAPIAuth() {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + await auth.auth.currentUser.getIdToken(/* forceRefresh */ true)
}