var dbmgr = require("./dbmgr");
var db = dbmgr.db;

exports.getNames = () => {
    const stmt = db.prepare('SELECT count(*) as nbbonus FROM hunt');
    const res = stmt.all();
    return res;
}