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

const app = express();
const pubmed = ncbi.pubmed;

var keyword;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieParser());

//db연결
/*
var connection = mysql.createConnection({
  host: "projectdb.cjdbbm9zlk2l.ap-northeast-2.rds.amazonaws.com",
  user: "user",
  password: "gachon6543210",
  database: "projectdb"
});
*/

// local database
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "final_project"
});

connection.connect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);


//메인화면에서 view에 있는 index.ejs가 나타나게 함
app.get('/', function(request,response){
	fs.readFile('./views/index.ejs','utf8',(error,data)=>{
		if(!error){
			if(keyword == null){
				console.log('post???');
				response.send(ejs.render(data, {
					paper:null,
					pubmed:null
					}));
				}
			else{
				pubmed.search(keyword, 0, 10).then((results) => {
				response.send(ejs.render(data, {
					paper:results,
					pubmed: pubmed
					}));
				});
			}
		}
	});
});

app.post('/',(request,response)=>{
	let body = request.body;
	keyword = body.searchBar;
	console.log("search keyword is ", keyword);
	response.redirect('/');
});

/*
app.get('/:keyword', (req, res, next){
	var keyword = request.body-parser(searchBar);
	pubmed.search(keyword, 0, 10).then((results)=>{
		console.log(results);
		res.send(results);
	});
});
*/

	
app.listen(app.get('port'),function(){
	console.log('server running at ' + app.get('port'));
});
