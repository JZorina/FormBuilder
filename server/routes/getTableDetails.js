var express = require('express');
var router = express.Router();
var mysql= require('mysql');
var arrForTable =[];

router.get('/', function(req, res, next) {

  var result=[];
  req.getConnection(function(error, conn) {
    conn.query('SELECT id,title FROM forms',function(err, rows, fields) {
      //if(err) throw err
      if (err) 
      {
        console.log(err);
        res.send({'success':false,'message':'Could not connect to db'});
      } 
      else 
      {
       arrForTable=rows;
         conn.query('SELECT formid,count(formid)as count FROM formData GROUP by formid order by formid'
         ,function(err, rows, fields) {
         //if(err) throw err
         if (err) 
         {
             console.log(err);
             res.send({'success':false,'message':'Could not connect to db'});
     
         } 
         else 
         {
            var res2=[];
            res2=rows;
             for(var i=0;i<arrForTable.length;i++)
             {
               for(var j=0;j<res2.length;j++)
               {
                  if(arrForTable[i].id===res2[j].formid)
                  {
                    arrForTable[i].count=res2[j].count;
                  }            
               }
                
             }
             result = JSON.stringify(arrForTable);
             res.send(result);
         }
         })  
      }
    })
  })
});
module.exports = router;
