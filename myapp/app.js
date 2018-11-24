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


//db연결
var connection = mysql.createConnection({
  host: "arn:aws:rds:ap-northeast-2:027926161829:db:projectdb",
  user: "user",
  password: "gachon6543210",
  database: "projectdb"
});

connection.connect();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//메인화면에서 view에 있는 index.ejs가 나타나게 함
app.get('/', (request,response)=>{
	fs.readFile('./views/index.ejs','utf8',(error,data)=>{
		response.send(ejs.render(data, {}));
	});
});


app.listen(3000,function(){
	console.log('server running at http://localhost:3000');
});
