const express = require("express");
const router = express.Router();
const db = require("../firebase/firestore")

module.exports = router

router.post("/create", async (req, res) => {
  const account = req.body;

  console.log(req.body);

  if(account.firstName == undefined || account.lastName == undefined || account.email == undefined) {
    res.status(400).send("Missing required fields")
    return
  }
  else {
    let accountDoc = {
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email,
      createdAt: new Date(),
      id: req.user.uid,
      role: "user"
    }

    await db.collection("Users").doc(req.user.uid).set(accountDoc);
    res.status(200).send({status: "success", user: accountDoc})
  }
})

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  if(req.user.uid == req.params.id) {
    let account = await db.collection("Users").doc(id).get()
    res.status(200).send({status: "success", user: account.data()})
  }
  else {
    res.status(403).send("Forbidden to access another user's account data")
  }
})