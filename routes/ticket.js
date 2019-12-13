const { Ticket, validate, validatePatch } = require("../models/ticketModel");
const mongoose = require("mongoose");
const express = require("express");
const ticketController = require("../controllers/ticketController");
const router = express.Router();

router.route("/viewall").get(ticketController.getAllTickets);

router.route("/add").post(ticketController.bookTicket);

router.route("/book/:id").patch(ticketController.updateById);

router.route("/admin/resetall").put(ticketController.admin);

router.route("/viewstatus/:id").get(ticketController.viewStatusById);

router.route("/viewdetails/:id").get(ticketController.viewById);

router.route("/viewopen").get(ticketController.viewOpen);

router.route("/viewclose").get(ticketController.viewClose);

module.exports = router;
