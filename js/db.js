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
    const stmt = db.prepare('SELECT hunt.id_bonushunt as idhunt, hunt.id_slots as id, slots.slot, slots.provider, hunt.bet_size, hunt.payout, hunt.multiplier from hunt join slots on hunt.id_slots = slots.id where id_bonushunt=:id');
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

exports.updatebonus = (idhunt,id,bet,payout) => {
    const sql = db.prepare('UPDATE hunt SET bet_size=:bet, payout=:payout WHERE id_bonushunt=:idhunt and id_slots=:id');
    sql.run({idhunt,id,bet,payout})
}

exports.bonushuntpage = () => {
    const stmt = db.prepare('SELECT id, title, start,date,(Select count(*) from hunt where hunt.id_bonushunt = bonus_hunt.id) as nbbonus from bonus_hunt group by id');
    const res = stmt.all();
    return res;
}

exports.avghuntwin = () => {
    const stmt = db.prepare('SELECT ((Select sum(payout))/(Select count(*))/(Select count(*) from bonus_hunt)) as avg from hunt');
    const res = stmt.all();
    return res;
}

exports.bestslot = (id) => {
    const stmt = db.prepare('select slot,max(payout) as best from (select payout, slots.slot, bonus_hunt.id from hunt join slots on hunt.id_slots = slots.id join bonus_hunt on hunt.id_bonushunt = bonus_hunt.id) where id=:id');
    const res = stmt.all({id});
    return res
    
}

exports.worstslot = (id) => {
    const stmt = db.prepare('select slot,min(payout) as worst from (select payout, slots.slot, bonus_hunt.id from hunt join slots on hunt.id_slots = slots.id join bonus_hunt on hunt.id_bonushunt = bonus_hunt.id) where id=:id');
    const res = stmt.all({id});
    return res
}

exports.amountwon = (id) => {
    const stmt = db.prepare('select sum(payout) as amountwon from hunt where id_bonushunt=:id');
    const res = stmt.all({id});
    return res
}

exports.avgrequire = (id) => {
    const stmt = db.prepare('SELECT ((bonus_hunt.start - SUM(hunt.payout)) / (SELECT COUNT(*) FROM hunt WHERE hunt.payout IS NULL)) as BE FROM hunt JOIN bonus_hunt on bonus_hunt.id = hunt.id_bonushunt where id_bonushunt=:id');
    const res = stmt.all({id});
    return res
}

exports.avg = (id) => {
    const stmt = db.prepare('SELECT avg(hunt.payout) as AVG FROM hunt where id_bonushunt=:id');
    const res = stmt.all({id});
    return res
}

exports.bex = (id) => {
    const stmt = db.prepare('SELECT ((SELECT ((bonus_hunt.start - SUM(hunt.payout)) / (SELECT COUNT(*) FROM hunt WHERE hunt.payout IS NULL)) FROM hunt JOIN bonus_hunt on bonus_hunt.id = hunt.id_bonushunt where id_bonushunt=:id) / avg(hunt.bet_size)) as BEX FROM hunt WHERE hunt.payout IS NULL');
    const res = stmt.all({id});
    return res
}

exports.avgx = (id) => {
    const stmt = db.prepare('SELECT avg(hunt.multiplier) as AVGX FROM hunt where id_bonushunt=:id');
    const res = stmt.all({id});
    return res
}

exports.remain = (id) => {
    const stmt = db.prepare('SELECT COUNT(*) as Remain FROM hunt WHERE hunt.payout IS NULL and id_bonushunt=:id');
    const res = stmt.all({id});
    return res
}

exports.cent = (id) => {
    const stmt = db.prepare('SELECT COUNT(*) as cent FROM hunt WHERE hunt.multiplier >= 100 and id_bonushunt=:id');
    const res = stmt.all({id});
    return res
}

exports.allslot = () => {
    const stmt = db.prepare('SELECT id,slot,provider,rtp,volatility,potential from slots');
    const res = stmt.all();
    return res;
}

exports.updateslot = (id,slot,provider,rtp,volatility,potential) => {
    const sql = db.prepare('UPDATE slots SET slot=:slot, provider=:provider, rtp=:rtp, volatility=:volatility, potential=:potential WHERE id=:id');
    sql.run({id,slot,provider,rtp,volatility,potential})
}

exports.provider = () => {
    const stmt = db.prepare('SELECT id, provider from slots group by provider');
    const res = stmt.all();
    return res;
}

exports.providerbyid = (id) => {
    const stmt = db.prepare('SELECT provider FROM slots where id=:id');
    const res = stmt.all({id});
    return res
}

exports.newslot = (slot,provider,rtp,volatility,potential) => {
    const sql = db.prepare('INSERT INTO slots (slot,provider,rtp,volatility,potential) VALUES (:slot, :provider, :rtp, :volatility, :potential)');
    sql.run({slot,provider,rtp,volatility,potential})
}
