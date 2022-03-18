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

exports.getTotalWin = () => {
    const stmt = db.prepare('SELECT SUM(payout) as totalwin FROM hunt');
    const res = stmt.all();
    return res;
}

exports.getProfitLoss = () => {
    const stmt = db.prepare('SELECT ((SELECT SUM(payout) as totalwin FROM hunt)-(SELECT SUM(start) as totalcost FROM bonus_hunt)) as ProfitLoss');
    const res = stmt.all();
    return res;
}

exports.newHunt = (title,start,date) => {
    const sql = db.prepare('INSERT INTO bonus_hunt (title,start,date) VALUES (:title, :start, :date)');
    sql.run({title,start,date})
}

exports.date = () => {
    const stmt = db.prepare('SELECT date FROM bonus_hunt');
    const res = stmt.all();
    return res;
}

exports.ProfitLoss = () => {
    const stmt = db.prepare('SELECT ((SELECT SUM(payout) FROM hunt where hunt.id_bonushunt = bonus_hunt.id)-(SELECT start FROM bonus_hunt where bonus_hunt.id = hunt.id_bonushunt)) as profitloss from bonus_hunt JOIN hunt on bonus_hunt.id = hunt.id_bonushunt GROUP BY id');
    const res = stmt.all();
    return res;
}

exports.bonushunt = () => {
    const stmt = db.prepare('SELECT * FROM bonus_hunt');
    const res = stmt.all();
    return res;
}

exports.deletehunt = (id) => {
    const stmt = db.prepare('DELETE from bonus_hunt WHERE id=:id');
    stmt.run ({id})
}