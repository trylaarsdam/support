const firebase = require("./firebase.js");
const api = require("./api-requests.js");
const config = require("../../config.json")

import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
} from "firebase/auth";

const auth = getAuth(firebase.app);

export {
  signIn,
  signUp,
  onAuthStateChanged,
  auth,
  sendEmailVerification
}


async function signIn(email, password) {
  try {
    let user = await signInWithEmailAndPassword(auth, email, password);
    return user
  } catch (err) {
    return err
  } 
}

async function signUp(email, password, firstName, lastName) {
  try {
    await createUserWithEmailAndPassword(auth, email, password)

    await api.updateAPIAuth()
    let response = await api.axios.post(config["api-hostname"] + "/api/v1/accounts/create", {
      firstName: firstName,
      lastName: lastName,
      email: email
    })

    console.log(response.data)

    return response.data
  } catch (err) {
    return err
  } 
}