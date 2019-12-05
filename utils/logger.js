const moment=require('moment')
const moment=require('moment')
function log(req,res,next){
console.log(`Input request Type: ${req.method} at ${moment.utc()}..`);
next();
}

module.exports=log