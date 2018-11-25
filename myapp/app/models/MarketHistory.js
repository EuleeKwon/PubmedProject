var mysql = require('mysql');
const Schema = mysql.Schema;

const SearchHistory = new Schema({
    fruit: {type: String, required: true}, //경락정보 품종
    result:[{
        marketname: {type: String, required: true},
        coname: {type: String, required: true},
        avgprice: {type: Number, required: true},
        rnum: {type: Number, required: true},
        unitname: {type: String, required: true},
    }],
    date: {type: String, required: true} //경락정보 날짜
}, {
    timestamp: true
});


MarketHistory.statics = {

};


mysql.model('MarketHistory', MarketHistory);
