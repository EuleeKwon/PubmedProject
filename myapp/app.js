var express = require('express');
var fs = require('fs');
var ejs = require('ejs');
var mysql = require('mysql');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var dte = require('date-utils');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/', (request,response)=>{
	fs.readFile('./views/index.ejs','utf8',(error,data)=>{
		response.send(ejs.render(data, {}));
	});
});


app.listen(3000,function(){
	console.log('server running at http://localhost:3000');
});
