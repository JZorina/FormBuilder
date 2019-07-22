var express = require('express');
var router = express.Router();
var mysql= require('mysql');



router.post('/', function(req, res, next) {
  var ret = req.body.id;
  req.getConnection(function(error, conn) {
    conn.query('SELECT formSchema FROM forms where id=?',[ret],function(err, rows, fields) {
      //if(err) throw err
      if (err) 
      {
        console.log(err);
        res.send({'success':false,'message':'Could not connect to db'});
  
      } 
      else 
      {
        res.send({'success':true,'data':rows});
        //console.log(rows);     
      }
    })
  })
});
module.exports = router;
