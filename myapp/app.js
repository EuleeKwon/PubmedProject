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
const pubmed = ncbi.pubmed;
//var eutils = require('ncbi-eutils');

var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


/*
//db연결
var connection = mysql.createConnection({
  host: "projectdb.cjdbbm9zlk2l.ap-northeast-2.rds.amazonaws.com",
  user: "user",
  password: "gachon6543210",
  database: "projectdb"
});

connection.connect();
*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//메인화면에서 view에 있는 index.ejs가 나타나게 함
app.get('/', (request,response)=>{
	fs.readFile('./views/index.ejs','utf8',(error,data)=>{
		response.send(ejs.render(data, {}));
	});
});


app.post('/',(request,response)=>{
  var body = "";
  var body = request.body.searchBar;
  pubmed.search(body, 0, 8).then((results) => {
    response.render(index.ejs,results)
		console.log(typeof(results))
		console.log(results.papers[0].title)
  });
});



app.listen(3000,function(){
	console.log('server running at http://localhost:3000');
});
