const fs = require('fs');
const express = require("express");
const mysql = require("mysql");
const ENV = require("./config/enviroment");
const {join} = require('path');

const app = express();
const models = join(__dirname, 'app/models');

/* model 등록 */
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(models, file)));


/* express 설정파일 적용 */
require("./config/express")(app);
require("./config/routes")(app);
module.exports = app;




/* 몽고디비연결 */
var connection = mysql.createConnection({
  host: "projectdb.cjdbbm9zlk2l.ap-northeast-2.rds.amazonaws.com",
  user: "user",
  password: "gachon6543210",
  database: "projectdb"
});




/* 서버 시작*/
app.listen(ENV.PORT || 3000, () => {
    console.log("running on "+ENV.PORT || 3000);

});
