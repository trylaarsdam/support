const auth = require("./firebase/auth")

const unauthEndpoints = [
  '/api',
  '/api/v1',
  '/api/v1/accounts/create',
]

module.exports = async function (req, res, next) {
  if(unauthEndpoints.includes(req.path)) {
    next()
  }
  else if(req.headers.authorization == undefined) {
    res.status(401).send("Missing Authorization Header")
  }
  else {
    if(req.headers.authorization.split(" ")[0] != "Bearer") {
      res.status(401).send("Malformed Authorization Header")
    }
    else {
      const idToken = req.headers.authorization.split(" ")[1]
      let authResult = await auth.verifyIDToken(idToken)

      if(authResult.status == "authenticated") {
        req.user = authResult.token
        next()
      }
      else {
        res.status(401).send({error: "Invalid ID Token", message: authResult.error.toString()})
      }
    }
  }
}