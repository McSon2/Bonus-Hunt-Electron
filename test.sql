-- SQLite
/*
SELECT slots.slot, slots.provider, hunt.bet_size, hunt.payout, hunt.multiplier
  FROM hunt
  JOIN slots on slots.id = hunt.id_slots
*/

/* Highest X
SELECT slots.slot, slots.provider, hunt.bet_size, hunt.payout, hunt.multiplier
  FROM hunt
  JOIN slots on slots.id = hunt.id_slots
  WHERE multiplier = (SELECT MAX(multiplier) FROM hunt)
  */

/* Highest win
SELECT slots.slot, slots.provider, hunt.bet_size, hunt.payout, hunt.multiplier
  FROM hunt
  JOIN slots on slots.id = hunt.id_slots
  WHERE payout = (SELECT MAX(payout) FROM hunt)
  */
  
/* AVG bets size
SELECT avg(hunt.bet_size) as AVG
  FROM hunt
  */

/* AVG WIN
SELECT avg(hunt.payout) as AVG
  FROM hunt
  */

/* AVG X
SELECT avg(hunt.multiplier) as AVG
  FROM hunt
  */
  
/* COUT PAR BONUS
SELECT (bonus_hunt.start / COUNT(hunt.id_slots)) as costperbonus
    from hunt
    JOIN bonus_hunt on bonus_hunt.id = hunt.id_bonushunt
    */

/* BREAK EVEN
SELECT (bonus_hunt.start - SUM(hunt.payout)) as BE
    FROM hunt
    JOIN bonus_hunt on bonus_hunt.id = hunt.id_bonushunt
    */

/* NB BONUS RESTANT
SELECT COUNT(*) as BonusRemain
    FROM hunt
    WHERE hunt.payout IS NULL
    */
  
/* BREAK EVEN PAR BONUS
SELECT ((bonus_hunt.start - SUM(hunt.payout)) / (SELECT COUNT(*) FROM hunt WHERE hunt.payout IS NULL))
    FROM hunt
    JOIN bonus_hunt on bonus_hunt.id = hunt.id_bonushunt
    */

/* BREAK EVEN X
SELECT ((SELECT ((bonus_hunt.start - SUM(hunt.payout)) / (SELECT COUNT(*) FROM hunt WHERE hunt.payout IS NULL)) FROM hunt JOIN bonus_hunt on bonus_hunt.id = hunt.id_bonushunt) / avg(hunt.bet_size)) as BEX
  FROM hunt
  WHERE hunt.payout IS NULL
  */
  
/* 100x Win
SELECT COUNT(*)
    FROM hunt
    WHERE hunt.multiplier > 100
    */

/* Nombre bonus par provider
SELECT slots.provider, COUNT(*) as slots
    FROM hunt
    JOIN slots on slots.id = hunt.id_slots
    GROUP BY slots.provider
    */
    
/* NB BONUS
SELECT count(*) as NB_Bonus
    FROM hunt
*/

SELECT ((SELECT SUM(payout) as totalwin FROM hunt)-(SELECT SUM(start) as totalcost FROM bonus_hunt)) as ProfitLoss