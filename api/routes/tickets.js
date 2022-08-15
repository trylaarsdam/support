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
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

router.get("/get/created", async (req, res) => {
  const user = req.user
  console.log(user.uid)
  const tickets = await db.collection("Tickets").where("createdBy", "==", user.uid).get()
  const ticketsArray = []
  tickets.forEach(ticket => {
    ticketsArray.push(ticket.data())
  })

  let users = {}

  for(var ticket of ticketsArray) {
    if(users[ticket.createdBy] == undefined) {
      let user = await db.collection("Users").doc(ticket.createdBy).get()
      if(user.exists) {
        users[ticket.createdBy] = user.data()
      } else {
        users[ticket.createdBy] = {
          firstName: "Unknown",
          lastName: "User",
          email: "Unknown",
          id: uuid()
        }
      }
    }

    ticketsArray[ticketsArray.indexOf(ticket)].createdBy = users[ticket.createdBy].firstName + " " + users[ticket.createdBy].lastName

    if(ticket.assignedTo != undefined) {
      if(users[ticket.assignedTo] == undefined) {
        let user = await db.collection("Users").doc(ticket.assignedTo).get()
        if(user.exists) {
          users[ticket.assignedTo] = user.data()
        } else {
          users[ticket.assignedTo] = {
            firstName: "Unknown",
            lastName: "User",
            email: "Unknown",
            id: uuid()
          }
        }
      }

      ticketsArray[ticketsArray.indexOf(ticket)].assignedTo = users[ticket.assignedTo].firstName + " " + users[ticket.assignedTo].lastName
    }
  }

  res.status(200).send({ status: "success", tickets: ticketsArray })
})

router.get("/:id", async (req, res) => {
  let id = req.params.id;

  let ticket = await db.collection("Tickets").doc(id).get()
  if (ticket.exists) {
    let ticketData = ticket.data()
    if (ticketData.createdBy == req.user.uid || req.user.uid == "admin" || req.user.uid == "staff") {
      var events = (await db.collection("Events").where("ticketID", "==", id).orderBy("createdAt", "asc").get()).docs.map(event => event.data())

      let users = {}

      for (var event of events) {
        if (users[event.userID] != undefined) {
          try {
            event.userName = users[event.userID].firstName + " " + users[event.userID].lastName
          } catch {
            let user = await db.collection("Users").doc(event.userID).get()
            if (user.exists) {
              users[event.userID] = user.data()
              event.userName = users[event.userID].firstName + " " + users[event.userID].lastName
            }
            else {
              event.userName = "Unknown User"
            }
          }
        }
        else {
          let user = await db.collection("Users").doc(event.userID).get()
          if (user.exists) {
            users[event.userID] = user.data()
            event.userName = users[event.userID].firstName + " " + users[event.userID].lastName
          }
          else {
            event.userName = "Unknown User"
          }
        }
      }

      if (users[ticketData.createdBy] != undefined) {
        ticketData.createdBy = users[ticketData.createdBy].firstName + " " + users[ticketData.createdBy].lastName
      }
      else {
        let user = await db.collection("Users").doc(ticketData.createdBy).get()
        if (user.exists) {
          users[ticketData.createdBy] = user.data()
          ticketData.createdBy = users[ticketData.createdBy].firstName + " " + users[ticketData.createdBy].lastName
        }
        else {
          ticketData.createdBy = "Unknown User"
        }
      }

      if (ticketData.assignedTo != undefined) {
        if (users[ticketData.assignedTo] != undefined) {
          ticketData.assignedTo = users[ticketData.assignedTo].firstName + " " + users[ticketData.assignedTo].lastName
        }
        else {
          let user = await db.collection("Users").doc(ticketData.assignedTo).get()
          if (user.exists) {
            users[ticketData.assignedTo] = user.data()
            ticketData.assignedTo = users[ticketData.assignedTo].firstName + " " + users[ticketData.assignedTo].lastName
          }
          else {
            ticketData.assignedTo = "Unknown User"
          }
        }
      }

      if (ticketData.assigneeID != undefined) {
        if (users[ticketData.assigneeID] != undefined) {
          ticketData.assignedTo = users[ticketData.assigneeID].firstName + " " + users[ticketData.assigneeID].lastName
        }
        else {
          let user = await db.collection("Users").doc(ticketData.assigneeID).get()
          if (user.exists) {
            users[ticketData.assigneeID] = user.data()
            ticketData.assigneeID = users[ticketData.assigneeID].firstName + " " + users[ticketData.assigneeID].lastName
          }
          else {
            ticketData.assigneeID = "Unknown User"
          }
        }
      }

      let assembledData = {
        ticket: ticketData,
        events: events
      }
      res.status(200).send({ status: "success", data: assembledData })
    }
    else {
      res.status(403).send({ status: "error", message: "Forbidden to access another user's ticket data" })
    }
  } else {
    res.status(404).send({ status: "error", message: "Ticket not found" })
  }
})

router.post("/create", async (req, res) => {
  let ticket = req.body

  if (ticket.title == undefined || ticket.description == undefined || ticket.priority == undefined || ticket.createdBy == undefined) {
    res.status(400).send("Missing required fields")
    return
  }
  if (ticket.createdBy != req.user.uid) {
    res.status(403).send("Forbidden to create ticket for another user")
    return
  }

  let ticketID = makeid(7)

  let events = [
    {
      type: "initialMessage",
      message: ticket.description,
      createdAt: new Date(),
      userID: ticket.createdBy,
      id: uuid(),
      ticketID: ticketID
    }
  ]

  if (ticketPriorities.includes(ticket.priority) == false) {
    ticket.priority == "normal"
    events.push({
      type: "priorityChanged",
      createdAt: new Date() + 1000,
      userID: "system",
      id: uuid(),
      ticketID: ticketID
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
    updatedAt: new Date(),
    tags: [],
  }

  try {
    await db.collection("Tickets").doc(construtedTicket.id).set(construtedTicket)
    for (let event of events) {
      await db.collection("Events").doc(event.id).set(event)
    }

    res.status(200).send({ status: "success", ticket: construtedTicket })
    return
  } catch (err) {
    res.status(500).send({ status: "error", message: "error creating ticket" })
  }

})