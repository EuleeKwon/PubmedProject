const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MarketHistory = new Schema({
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


mongoose.model('MarketHistory', MarketHistory);
