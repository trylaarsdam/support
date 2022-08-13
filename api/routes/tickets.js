const express = require("express");
const router = express.Router();
const db = require("../firebase/firestore")
const uuid = require("uuid").v4

module.exports = router

const ticketPriorities = [
  "backlog",
  "normal",
  "urgent",
  "critical"
]

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}


router.post("/create", async (req, res) => {
  let ticket = req.body

  if(ticket.title == undefined || ticket.description == undefined || ticket.priority == undefined || ticket.createdBy == undefined) {
    res.status(400).send("Missing required fields")
    return
  }
  if(ticket.createdBy != req.user.uid) {
    res.status(403).send("Forbidden to create ticket for another user")
    return
  }

  let events = [
    {
      type: "initialMessage",
      message: ticket.description,
      createdAt: new Date(),
      userID: ticket.createdBy,
      id: uuid()
    }
  ]

  if(ticketPriorities.includes(ticket.priority) == false) {
    ticket.priority == "normal"
    events.push({
      type: "priorityChanged",
      createdAt: new Date() + 1000,
      userID: "system",
      id: uuid()
    })
  }
  
  let construtedTicket = {
    id: makeid(7),
    title: ticket.title,
    priority: ticket.priority,
    createdBy: ticket.createdBy,
    createdAt: new Date(),
    events: events.map(event => event.id),
    closed: false,
    locked: false,
    tags: [],
  }

  try {
    await db.collection("Tickets").doc(construtedTicket.id).set(construtedTicket)
    for(let event of events) {
      await db.collection("Events").doc(event.id).set(event)
    }

    res.status(200).send({status: "success", ticket: construtedTicket})
    return
  } catch (err) {
    res.status(500).send({status: "error", message: "error creating ticket"})
  }

})