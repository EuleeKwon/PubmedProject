const marketList = require('../../config/marketData');
const {getNameByCode} = require('../../helper/utility');
const dummyResult = require('../../dummy/result');
const {API_URL,SERVICEKEY} = require('../../config/enviroment');
const request = require('request-promise');
const pageTitle = "외부 API 호출";
module.exports.index = async function (req, res) {
    res.render("external/form", {marketList,pageTitle});
};


module.exports.result = async function (req, res) {


    const marketResult = await request.get({
        url: API_URL,
        timeout: 10000,
        json:true,
        qs: {
            'ServiceKey': SERVICEKEY,
            'dates': "20180829",
            'lcode': req.query.mcode.substring(0,2),
            'mcode': req.query.mcode,
            'numOfRows': "10",
            'pageSize': "10",
            'pageNo': "1",
            'startPage': "1",
            '_type': "json",
        },
    }).then((result)=>{
        /*데이터를 성공적으로 가져온경우 필요한 item 리스트만 가져옵니다.*/
        return result.response.body
    }).catch(e =>{
        /* 에러처리*/
        console.error("request Error : "+e)
    });



    res.render("external/result", {
        fruit:getNameByCode(req.query.mcode),
        marketResult,
        query:req.query,
        pageTitle
    });
};

