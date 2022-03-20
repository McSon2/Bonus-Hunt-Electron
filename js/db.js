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
    const stmt = db.prepare('SELECT id, title, start,date,(Select count(*) from hunt where hunt.id_bonushunt = bonus_hunt.id) as nbbonus, ((SELECT SUM(payout) FROM hunt where hunt.id_bonushunt = bonus_hunt.id)-(SELECT start FROM bonus_hunt where bonus_hunt.id = hunt.id_bonushunt)) as profitloss from bonus_hunt JOIN hunt on bonus_hunt.id = hunt.id_bonushunt GROUP BY id');
    const res = stmt.all();
    return res;
}

exports.deletehunt = (id) => {
    const stmt = db.prepare('DELETE from bonus_hunt WHERE id=:id');
    stmt.run ({id})
}

exports.updatehunt = (title,start,date,id) => {
    const sql = db.prepare('UPDATE bonus_hunt SET title=:title, start=:start, date=:date WHERE id=:id');
    sql.run({title,start,date,id})
}

exports.ProfitLossbyid = (id) => {
    const stmt = db.prepare('SELECT id, ((SELECT SUM(payout) FROM hunt where hunt.id_bonushunt = bonus_hunt.id)-(SELECT start FROM bonus_hunt where bonus_hunt.id = hunt.id_bonushunt)) as profitloss from bonus_hunt JOIN hunt on bonus_hunt.id = hunt.id_bonushunt WHERE id=:id GROUP BY id');
    const res = stmt.all({id});
    return res
}

exports.CountBonusbyid = (id) => {
    const stmt = db.prepare('SELECT count(*) as NB_Bonus FROM hunt where id_bonushunt=:id');
    const res = stmt.all({id});
    return res
}

exports.startbyid = (id) => {
    const stmt = db.prepare('SELECT start FROM bonus_hunt where id=:id');
    const res = stmt.all({id});
    return res
}

exports.hunt = (id) => {
    const stmt = db.prepare('SELECT hunt.id_bonushunt, hunt.id_slots as id, slots.slot, slots.provider, hunt.bet_size, hunt.payout, hunt.multiplier from hunt join slots on hunt.id_slots = slots.id where id_bonushunt=:id');
    const res = stmt.all({id});
    return res
}

exports.slots = () => {
    const stmt = db.prepare('select id, slot FROM slots');
    const res = stmt.all();
    return res
}

exports.newbonus = (idhunt,slotid,betsize) => {
    const sql = db.prepare('INSERT INTO hunt (id_bonushunt,id_slots,bet_size) VALUES (:idhunt, :slotid, :betsize)');
    sql.run({idhunt,slotid,betsize})
}

exports.deletebonus = (id) => {
    const stmt = db.prepare('DELETE from hunt WHERE id_slots=:id');
    stmt.run ({id})
}

exports.getidhunt = (title) => {
    const stmt = db.prepare('SELECT id from bonus_hunt where title=:title');
    const res = stmt.all({title});
    return res
}