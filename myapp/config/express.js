const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const exphbs = require('express-handlebars');
const hbsHelper = require('handlebars-helpers');

module.exports = function (app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true,}));
    app.use(cors());

    app.use(express.static('public')); //Resource 용으로 사용할 static router 정의


    const hbs = exphbs.create({
        extname: '.hbs',
        partialsDir: __dirname + '/../app/views/partials',
        defaultLayout: __dirname + '/../app/views/layouts/default.hbs',
        layoutsDir: __dirname + '/../app/views/layouts',
        helpers: hbsHelper,
    });
    require('handlebars-helpers')(hbs);
    app.engine('.hbs', hbs.engine); //사용할 뷰 엔진의 option 설정

    app.set('view engine', '.hbs'); //사용할 뷰 엔진을 정의
    app.set('views', path.join(__dirname, '/../app/views')); //뷰가 있는 디렉토리를 정의

};
