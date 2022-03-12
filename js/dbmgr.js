const sqlite = require('better-sqlite3');
const db = new sqlite("./Database/bh.db");
exports.db = db;

//
// const stmt = db.prepare('SELECT count(*) as nbbonus FROM hunt');
// const test = stmt.get();
// console.log(test);
//
