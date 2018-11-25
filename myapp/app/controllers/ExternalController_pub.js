const request = require('request-promise');
const pageTitle = "외부 API 호출";


module.exports.index = async function (req, res) {
    res.render("layouts/index", {marketList,pageTitle});
};


module.exports.result = async function (req, res) {


    const searchlog = await request.get({
        url: "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi",
        timeout: 10000,
        json:true,
        qs: {
            //pubmed db에서 (고정 값이기때문에 그대로 사용)
            db: 'pubmed',
            //어떤걸 검색할지. 예를들어 사용자가 검색어를 입력하고 검색하는 request 가 발생했을때 넣어주는값
            term: req.body.term,
            retstart: start,
            retmax: resultsPerPage
        },
    }).then((result)=>{
        /*데이터를 성공적으로 가져온경우 필요한 item 리스트만 가져옵니다.*/
        return result
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
