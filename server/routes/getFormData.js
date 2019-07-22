var express = require('express');
var router = express.Router();
var mysql= require('mysql');

router.post('/', function(req, res, next) {
    var id =req.body.id;
    req.getConnection(function(error, conn) {
        conn.query('SELECT data FROM formData where formid=?',[id]
        ,function(err, rows, fields) {
        //if(err) throw err
        if (err) 
        {
            console.log(err);
            res.send({'success':false,'message':'Could not connect to db'});
    
        } 
        else 
        {
            if(rows.length>0){
                ret = JSON.stringify(rows);
                res.send(ret);
                console.log(ret); 
            }
            else{
                conn.query('SELECT formSchema FROM forms where id=?',[id]
                ,function(err, rows, fields) {
                    //if(err) throw err
                    if (err) 
                    {
                        console.log(err);
                        res.send({'success':false,'message':'Could not connect to db'});
                
                    } 
                    else 
                    {
                        ret = JSON.stringify(rows);
                        res.send(ret);
                        console.log(ret); 
                    }
                });
            }
            }
        });
  })
});
module.exports = router;
