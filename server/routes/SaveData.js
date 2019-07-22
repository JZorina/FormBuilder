var express = require('express');
var router = express.Router();
var mysql= require('mysql');


router.post('/', function(req, res, next) {
  var data=req.body.data;
  var id=req.body.id;
  ret = JSON.stringify(data);

    req.getConnection(function(error, conn) {
    conn.query( "INSERT INTO formdata (formid,data) VALUES (?,?)",
    [id,ret],function(err, rows, fields) {
        //if(err) throw err
        if (err) {
         console.log(err);
            res.send({'success':false,'message':'Could not connect to db'});
        } else {
            res.send({'success':true,'message':'form data saved in the system successfully '}); 
        }
    })
    })
});
module.exports = router;
