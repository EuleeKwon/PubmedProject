const marketList = require('../config/marketData');
module.exports.getNameByCode  = (code) => marketList.filter(data => data.mcode == code)[0].name;
