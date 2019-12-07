const { Ticket, validate } = require("../models/ticketModel");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/viewall", async (req, res) => {
  const tickets = await Ticket.find().sort("name");
  res.send(tickets);
});

router.post("/book", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try{
  const count = await Ticket.countDocuments();
console.log(`total seats booked ${count}`)
  if (count < 40) {
    console.log(req.body.name);
    let ticket = new Ticket({
      name: req.body.name,
      isOpen: req.body.isOpen,
      phone: req.body.phone,
      email: req.body.email
    });
    try{
    tickets = await ticket.create();
    res.send(tickets);
    }
    catch(err){
      console.log(err)
    }
  }
}
catch(err){
  console.log(err)
}
  res.status(508).send("No more tickets to book");
});

router.put("/update/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const ticket = await Ticket.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      isOpen: req.body.isOpen,
      phone: req.body.phone,
      email: req.body.email
    },
    { new: true }
  );

  if (!ticket)
    return res.status(404).send("The ticket with the given ID was not found.");

  res.send(ticket);
});

router.get("/view/:id", async (req, res) => {
  const result = mongoose.Types.ObjectId.isValid(req.params.id);
  console.log(result);

  if(result)
  {
  let ticket;
  try {
    ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res
        .status(404)
        .send("The ticket with the given ID was not found.");
    }
    res.send(ticket);
  } catch (err) {
    console.log(err);
    return;
  }
}
res.status(400).send('Invalid Id');
});

router.get("/viewOpen", async (req, res) => {
  let ticket;
  try {
    ticket = await Ticket.find({ isOpen: { $ne: false } });
    if (ticket.length < 1) return res.status(404).send("No open tickets found.");
    res.send(ticket);
  } catch (err) {
    console.log(err);
  }
});

router.get("/viewClose", async (req, res) => {
  let ticket;
  try {
    ticket = await Ticket.find({ isOpen: { $eq: false } });
    if (ticket.length < 1) return res.status(404).send("No closed tickets found.");
    res.send(ticket);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
