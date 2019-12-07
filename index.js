const logger = require("./utils/logger");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const config = require("config");
const mongoose=require('mongoose');
const ticket=require('./routes/ticket');

mongoose.connect('mongodb+srv://karthik:jinglebells25@mynodejs-eg4u7.mongodb.net/test?retryWrites=true&w=majoritymongodb+srv://karthik:jinglebells@25@mynodejs-eg4u7.mongodb.net/test?retryWrites=true&w=majority',{ useUnifiedTopology: true,useNewUrlParser: true ,useFindAndModify: false })
    .then(()=>{console.log("Db connection done")})
    .catch((err)=>{console.log(err)})
const app = express();

app.use(express.json()); //middleware to parse the input request body to json object
app.use(express.urlencoded({ extended: true }));
app.use(helmet()); //to secure HTTP headers

console.log(`Running in ${config.get("name")}`);

if (config.get("env") === "dev") {
  console.log("Enabling morgan for request logging");
  app.use(morgan("combined")); //used for incoming request logging
  app.use(logger);
}

app.use('/tickets',ticket);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Hey im living on : ${port} `));

/* const ticketSchema=new mongoose.Schema({
  ticketId:String,
  passenger1:String,
  passenger2:String
  })
const Ticket=mongoose.model('ticket',ticketSchema);

async function insertTicket(){
  const tick=new Ticket({
    ticketId:"12345",
    passenger1:"karthik",
    passenger2:"karthik2"
  })
  const saved=await tick.save();
  console.log(saved);
}
insertTicket();
 */ 