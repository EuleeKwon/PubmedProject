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

//DB아이디 비번 임의로 작성
/*
//db연결
var client = mysql.createConnection({
  host: "projectdb.cjdbbm9zlk2l.ap-northeast-2.rds.amazonaws.com",
  user: "user",
  password: "gachon6543210",
  database: "projectdb"
});


/*
// local database
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "final_project"
});


client.connect();
*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);


//메인화면에서 view에 있는 main.ejs가 나타나게 함
// main.ejs는 키워드 검색 기능만 제공하며, 데이터 받아오기만 하는 기능이다.
app.get('/', function(request,response){
	fs.readFile('./views/main.ejs','utf8',(error,data)=>{
		if(!error) {
			console.log('main');
			response.send(ejs.render(data, {}));
		}
	});
});

// 메인에서 keyword 를 받아왔을 때 넘겨주는 post 함수
app.post('/',(request,response)=>{
	let body = request.body;
	keyword = body.searchBar;
	console.log("search keyword is ", keyword);
	response.redirect('/search');
});

// post 함수를 이용해서 search값을 받아왔을때 index.ejs를 보여주는 app.get
// 이부분만 계속 돌려막기 할 것
app.get('/search', function(request, response){
	fs.readFile('./views/index.ejs', 'utf8', (error, data)=>{
		if(!error){
			pubmed.search(keyword, 0, 8).then((results)=>{
				response.send(ejs.render(data, {
					paper:results,
					pubmed:pubmed
				}));
			});
		}
		else console.log(error);
	});
});

//버튼에 따라서 save와 research 를 분리
// search 부분에서도 post로 값 받아오는 부분이 필요하다.
app.post('/search', (request, response)=>{
	let body = request.body;
	keyword = body.searchBar;
	var example = example;
	var inputValue = request.body.button;
	if(inputValue == "search") {
		console.log("search keyword is ", keyword);
		response.redirect('/search');
	}else{
		client.query('INSERT INTO hisDB (keyword,title,count)VALUES(?,?,?)',[keyword,example,1])
		console.log("Insertion into DB was completed !");
		res.redirect('/search');
		}
	});



app.listen(app.get('port'),function(){
	console.log('server running at ' + app.get('port'));
});
