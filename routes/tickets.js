const express=require('express');
const router=express.Router(); 

const tickets = [
    {
      id: 1,
      name: "Tendulkar",
      email: "sachin@gmail.com"
    },
    {
      id: 2,
      name: "Dhoni",
      email: "dhoni@gmail.in"
    }
  ];
router.get("/", (req, res) => {
    res.send(tickets);
  });
  
  //need to use joi for validation..
  router.post("/add", (req, res) => {
    const newTicket = req.body;
    tickets.push(newTicket);
    res.send(newTicket);
  });

  module.exports=router