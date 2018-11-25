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
var ncbi = require('node-ncbi');

var app = express();
const pubmed = ncbi.pubmed;

var keyword = "cancer";

//db연결
/*
var connection = mysql.createConnection({
  host: "projectdb.cjdbbm9zlk2l.ap-northeast-2.rds.amazonaws.com",
  user: "user",
  password: "gachon6543210",
  database: "projectdb"
});
*/

// 임시로 개인 local database 연결
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '1234',
	port: 3306,
database: 'final_project'});

connection.connect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//메인화면에서 view에 있는 index.ejs가 나타나게 함
app.get('/', (request,response)=>{
	fs.readFile('./views/index.ejs','utf8',(error,data)=>{
		pubmed.search(keyword, 0, 6).then((results)=>{
			response.send(ejs.render(data, {paper:results, pubmed: pubmed}));
			});
		});
});

app.post('/', (req, res) => {
	let body = req.body;
	console.log("keyword: ");
	console.log("==>: ", body.key);
	keyword = body.key;
	res.redirect('/');
});


app.listen(3000,function(){
	console.log('server running at http://localhost:3000');
});
