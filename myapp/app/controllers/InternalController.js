const marketList = require('../../config/marketData');
const {SERVICEKEY, API_URL} = require('../../config/enviroment');
const {getNameByCode} = require('../../helper/utility');
const mongoose = require("mongoose");
const MarketHistory = mongoose.model('MarketHistory');
const request = require('request-promise');
const pageTitle = "내부 DB 이용";


module.exports.index = async function (req, res) {
    const marketHistories = await MarketHistory.find();
    res.render("internal/form", {marketList, pageTitle,marketHistories});
};

module.exports.show = async function(req,res){
    const marketHistory = await MarketHistory.findOne({_id:req.query.id});
    res.render("internal/result", {pageTitle,marketHistory});
};

module.exports.deleteResult  = async function(req,res){

    MarketHistory.findOneAndRemove(req.body.id,(err)=>{
       if(err) res.status(500).send();
       else res.status(200).send()
    });


};

/**
 *
 * 검색된 결과가 없으면 200
 * 1개 이상일경우 204
 * 에러가 난 경우 500을 리턴합니다.
 */
module.exports.createResult = async function (req, res) {

    console.log(req.body);

    const marketResult = await request.get({
        url: API_URL,
        timeout: 10000,
        json: true,
        qs: {
            'ServiceKey': SERVICEKEY,
            'dates': req.body.date.split("-").join(''), //정규식을 사용하려 하였지만 이편이 조금 더 이해가 쉬울것같아 split과 join으로 사용하였습니다.
            'lcode': req.body.mcode.substring(0, 2),
            'mcode': req.body.mcode,
            'numOfRows': req.body.count,
            'pageSize': "10",
            'pageNo': "1",
            'startPage': "1",
            '_type': "json",
        },
    }).then((result) => {
        /*데이터를 성공적으로 가져온경우 필요한 item 리스트만 가져옵니다.*/
        return result.response.body
    }).catch(e => {
        /* 에러처리*/
        console.error("request Error : " + e);
        res.status(500).send();
    });


    let result = marketList.filter(data => data.mcode == req.body.mcode);
    /* 0보다 많을경우 데이터베이스에 넣어줍니다.*/
    if(marketResult.totalCount > 0){
        new MarketHistory({
            fruit:getNameByCode(req.body.mcode),
            date:req.body.date,
            result:marketResult.items.item
        }).save((err) =>{
            if(err) res.status(500).send();
            else res.status(204).send() //
        })
    }else{
        /* 검색된 결과가 0개인경우*/
        res.status(200).send("데이터가 없습니다.");
    }



};

