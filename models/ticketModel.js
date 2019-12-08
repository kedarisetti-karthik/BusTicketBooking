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
      default: false
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
    },
    date:{
      type : Date,
      default : Date.now
    },
    gender:{
      type :String,
      enum:['male','female','other']
    },
    age:{
      type:Number,
      min:3,
      max:100
    }
  },{
    versionKey: false
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
    isOpen: Joi.boolean(),
    age:Joi.number().integer().greater(3).required(),
    gender:Joi.string().required(),
    date:Joi.date()
  };
const result=Joi.validate(ticket, schema);
  return result;
}

function validateTicketPatch(ticket) {
  const schema = {
    name: Joi.string()
    .regex(/^[a-zA-Z ]*$/)
      .min(3)
      .max(30),
    phone: Joi.string()
      .min(10)
      .max(10),
    email: Joi.string().email({ minDomainAtoms: 2 }),
    isOpen: Joi.boolean().required(),
    age:Joi.number().integer().greater(3),
    gender:Joi.string(),
    date:Joi.date()
  };
const result=Joi.validate(ticket, schema);
  return result;
}

exports.Ticket = Ticket;
exports.validate = validateTicket;
exports.validatePatch=validateTicketPatch;