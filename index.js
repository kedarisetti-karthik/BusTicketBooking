const logger = require("./utils/logger");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const config = require("config");
const tickets=require('./routes/tickets');

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

app.use('/tickets',tickets);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Hey im living on : ${port} `));
