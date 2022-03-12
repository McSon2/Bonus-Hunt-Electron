const sqlite = require('better-sqlite3');
const db = new sqlite("./Database/bh.db");

exports.getNbonus = () => {
    const stmt = db.prepare('SELECT count(*) as nbonus FROM hunt');
    const res = stmt.all();
    return res;
}
