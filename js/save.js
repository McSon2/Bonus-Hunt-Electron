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