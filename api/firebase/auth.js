const admin = require("./admin")

const auth = admin.auth()

module.exports = {
  verifyIDToken,
  disableUser,
  enableUser
}

async function verifyIDToken(idToken) {
  try {
    let decodedToken = await auth.verifyIdToken(idToken)
    return {status: "authenticated", token: decodedToken}
  } catch (err) {
    return {status: "error", error: err}
  }
}

async function disableUser(uid) {
  try {
    let user = await auth.updateUser(uid, {
      disabled: true
    })
    return user
  } catch (err) {
    return err
  }
}

async function enableUser(uid) {
  try {
    let user = await auth.updateUser(uid, {
      disabled: false
    })
    return user
  } catch (err) {
    return err
  }
}