const marketExternal = require("../app/controllers/ExternalController");
const marketInternal = require("../app/controllers/InternalController");
module.exports = function (app) {

    /**
     * comment: 외부에 요청한 데이터를 그대로 파싱하여 리턴합니다.
     */
    app.get("/",((req,res) => res.redirect('/external')));
    app.get("/external", marketExternal.index);
    app.get("/external/result", marketExternal.result);
    app.get("/internal", marketInternal.index);
    app.get("/internal/show", marketInternal.show);
    app.delete("/internal/delete", marketInternal.deleteResult);
    app.post("/internal/result", marketInternal.createResult);

};
