const Joi = require('joi');
const mongoose = require('mongoose');

const Ticket = mongoose.model(
  'Ticket',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30
    },
    isOpen: {
      type: Boolean,
      default: true
    },
    phone: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10
    },
    email: {
      type: String,
      minlength: 3,
      maxlength: 50
    }
  })
);

function validateTicket(ticket) {
  const schema = {
    name: Joi.string()
    .regex(/^[a-zA-Z ]*$/)
      .min(3)
      .max(30)
      .required(),
    phone: Joi.string()
      .min(10)
      .max(10)
      .required(),
    email: Joi.string().required().email({ minDomainAtoms: 2 }),
    isOpen: Joi.boolean()
  };
const result=Joi.validate(ticket, schema);
  return result;
}

exports.Ticket = Ticket;
exports.validate = validateTicket;