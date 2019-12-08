const { Ticket, validate, validatePatch } = require("../models/ticketModel");
const mongoose = require("mongoose");
const express = require("express");
const ticketController = require("../controllers/ticketController");
const router = express.Router();

router.route("/viewAll").get(ticketController.getAllTickets);

router.route("/add").post(ticketController.bookTicket);

router.route("/book/:id").patch(ticketController.updateById);

router.route("/admin").put(ticketController.admin);

router.route("/viewStatus/:id").get(ticketController.viewStatusById);

router.route("/viewDetails/:id").get(ticketController.viewById);

router.route("/viewOpen").get(ticketController.viewOpen);

router.route("/viewClose").get(ticketController.viewClose);

module.exports = router;
