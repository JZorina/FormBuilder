var express = require('express');
var router = express.Router();
var mysql= require('mysql');


router.post('/', function(req, res, next) {
  var title=req.body.form.title;
  var schema=req.body.form,schema
  ret = JSON.stringify(schema);
  

    req.getConnection(function(error, conn) {
    conn.query( "INSERT INTO forms (title,formSchema) VALUES (?,?)",
    [title,ret],function(err, rows, fields) {
        //if(err) throw err
        if (err) {
         console.log(err);
            res.send({'success':false,'message':'Could not connect to db'});
        } else {
            res.send({'success':true,'message':'form saved in the system successfully '}); 
        }
    })
    })
});
module.exports = router;
