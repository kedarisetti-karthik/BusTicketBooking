const { Ticket, validate, validatePatch } = require("../models/ticketModel");
const mongoose = require("mongoose");

module.exports.getAllTickets = async function(req, res, next) {
  await Ticket.find({})
    .sort({ name: -1, isOpen: -1 })
    .exec((err, response) => {
      if (err) {
        res.status(500).json({ message: "Unable to fetch Records from DB" });
      } else {
        res.status(200).json(response);
      }
    });
};

module.exports.viewClose = async function(req, res, next) {
  let ticket;
  try {
    ticket = await Ticket.find({ isOpen: { $eq: false } }).sort("name");
    if (ticket.length < 1)
      return res.status(404).send("No closed tickets found.");
    res.send(ticket);
  } catch (err) {
    console.log(err);
  }
};

module.exports.viewOpen = async function(req, res, next) {
  let ticket;
  try {
    ticket = await Ticket.find({ isOpen: { $ne: false } });
    if (ticket.length < 1)
      return res
        .status(404)
        .send("No open tickets found.")
        .sort("name");
    res.send(ticket);
  } catch (err) {
    console.log(err);
  }
};

module.exports.viewById = async function(req, res, next) {
  const result = mongoose.Types.ObjectId.isValid(req.params.id);
  console.log(result);

  if (result) {
    let ticket;
    try {
      ticket = await Ticket.findById(req.params.id).select(
        "name email phone age gender"
      );

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
  } else {
    res.status(400).send("Invalid Id");
  }
};

module.exports.viewStatusById = async function(req, res, next) {
  const result = mongoose.Types.ObjectId.isValid(req.params.id);
  console.log(result);

  if (result) {
    let ticket;
    try {
      ticket = await Ticket.findById(req.params.id).select("isOpen");

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
  } else {
    res.status(400).send("Invalid Id");
  }
};

module.exports.admin = async function(req, res, next) {
  try {
    const ticket = await Ticket.update(
      {},
      {
        $set: { isOpen: true },
        $unset: {
          name: "",
          email: "",
          phone: "",
          date: "",
          age: "",
          gender: ""
        }
      },
      { multi: true }
    );
    const { nModified } = ticket;
    if (!ticket)
      return res
        .status(404)
        .send("The ticket with the given ID was not found.");

    res.json({ modified_count: nModified });
  } catch (err) {
    console.log(err);
  }
};

module.exports.updateById = async function(req, res, next) {
  const { error } = validatePatch(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const result = mongoose.Types.ObjectId.isValid(req.params.id);
  let ticket;
  let flag;
  try {
    if (result) {
      oldticket = await Ticket.findById(req.params.id);
      if (!oldticket)
        return res
          .status(404)
          .send("The ticket with the given ID was not found.");

      if (oldticket.isOpen) {
        ticket = await Ticket.findByIdAndUpdate(
          req.params.id,
          {
            name: req.body.name != null ? req.body.name : oldticket.name,
            phone: req.body.phone != null ? req.body.phone : oldticket.phone,
            isOpen: false,
            email: req.body.email != null ? req.body.email : oldticket.email,
            age: req.body.age != null ? req.body.age : oldticket.age,
            gender: req.body.gender != null ? req.body.gender : oldticket.gender
          },
          { new: true }
        );
      }
      else{
        ticket = await Ticket.findByIdAndUpdate(
          req.params.id,
          {
            name: req.body.name != null ? req.body.name : oldticket.name,
            phone: req.body.phone != null ? req.body.phone : oldticket.phone,
            isOpen: false,
            email: req.body.email != null ? req.body.email : oldticket.email,
            age: req.body.age != null ? req.body.age : oldticket.age,
            gender: req.body.gender != null ? req.body.gender : oldticket.gender
          },
          { new: true }
        );
      }

      res.send(ticket);
    } else {
      res.status(400).send("Invalid Id");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.bookTicket = async function(req, res, next) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const count = await Ticket.countDocuments();
    console.log(`total seats booked ${count}`);
    if (count < 40) {
      console.log(req.body.name);
      let ticket = new Ticket({
        name: req.body.name,
        isOpen: req.body.isOpen,
        phone: req.body.phone,
        email: req.body.email
      });
      tickets = await ticket.save();
      res.send(tickets);
    }
  } catch (err) {
    console.log(err);
    return;
  }
  res.status(507).send("No more tickets to book");
};
