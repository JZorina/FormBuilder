const express = require('express');
const app = express();

var cookieParser = require('cookie-parser');
var createError = require('http-errors');
var path = require('path');
var mysql= require('mysql');
var logger = require('morgan');
var bodyParser= require('body-parser');
var cors = require('cors');
app.use(cors());


app.get('/',(req,res)=>{
    res.send("Welcome to the server side !");
  });
  
app.listen(3001);


var indexRouter = require('./routes/index');
var AddForm = require('./routes/AddForm');
var getAll = require('./routes/getAll');
var getTableDetails = require('./routes/getTableDetails');
var getFormSchema = require('./routes/getFormSchema');
var SaveData = require('./routes/SaveData');
var getFormData = require('./routes/getFormData');


var myConnection  = require('express-myconnection');

var config = require('./config')
var dbOptions = {
    host:	  config.database.host,
    user: 	  config.database.user,
    password: config.database.password,
    port: 	  config.database.port, 
    database: config.database.db
}
  
app.use(myConnection(mysql, dbOptions, 'pool'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/AddForm', AddForm);
app.use('/getAll', getAll);
app.use('/getTableDetails', getTableDetails);
app.use('/getFormSchema', getFormSchema);
app.use('/SaveData', SaveData);
app.use('/getFormData', getFormData);


app.use(function(req, res, next) {
    next(createError(404));
  });
  
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;
