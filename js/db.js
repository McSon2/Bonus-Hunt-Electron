const sqlite = require('better-sqlite3');
const db = new sqlite("./Database/bh.db");

exports.getNbonus = () => {
    const stmt = db.prepare('SELECT count(*) as nbonus FROM bonus_hunt');
    const res = stmt.all();
    return res;
}

exports.getTotalCost = () => {
    const stmt = db.prepare('SELECT SUM(start) as totalcost FROM bonus_hunt');
    const res = stmt.all();
    return res;
}
