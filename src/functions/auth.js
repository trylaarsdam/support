const firebase = require("./firebase.js");
import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
} from "firebase/auth";

export {
  signIn,
  signUp,
  onAuthStateChanged,
  auth,
  sendEmailVerification
}

const auth = getAuth(firebase.app);

async function signIn(email, password) {
  try {
    let user = await signInWithEmailAndPassword(auth, email, password);
    return user
  } catch (err) {
    return err
  } 
}

async function signUp(email, password) {
  try {
    let user = await createUserWithEmailAndPassword(auth, email, password)
    return user
  } catch (err) {
    return err
  } 
}