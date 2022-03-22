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
/*
SELECT ((SELECT SUM(payout) as totalwin FROM hunt)-(SELECT SUM(start) as totalcost FROM bonus_hunt)) as ProfitLoss
*/
/*
SELECT *,(
  SELECT SUM(payout) FROM hunt where hunt.id_bonushunt = bonus_hunt.id
  ) as totalwin 
from bonus_hunt;
*/

SELECT title, start, date,(SELECT SUM(payout) FROM hunt where hunt.id_bonushunt = bonus_hunt.id) as totalpayout,(
  (SELECT SUM(payout) FROM hunt where hunt.id_bonushunt = bonus_hunt.id)-(SELECT start FROM bonus_hunt where bonus_hunt.id = hunt.id_bonushunt)
) as profitloss 
from bonus_hunt
JOIN hunt on bonus_hunt.id = hunt.id_bonushunt 
GROUP BY id

SELECT id, (
  (SELECT SUM(payout) FROM hunt where hunt.id_bonushunt = bonus_hunt.id)-(SELECT start FROM bonus_hunt where bonus_hunt.id = hunt.id_bonushunt)
) as profitloss 
from bonus_hunt
JOIN hunt on bonus_hunt.id = hunt.id_bonushunt
GROUP BY id

SELECT date
FROM bonus_hunt

SELECT title, start, date
FROM bonus_hunt


SELECT title, start,date,(
Select count(*) from hunt where hunt.id_bonushunt = bonus_hunt.id
) as nbbonus, (
  (SELECT SUM(payout) FROM hunt where hunt.id_bonushunt = bonus_hunt.id)-(SELECT start FROM bonus_hunt where bonus_hunt.id = hunt.id_bonushunt)
) as profitloss 
from bonus_hunt
JOIN hunt on bonus_hunt.id = hunt.id_bonushunt 
GROUP BY id



SELECT id, (
Select count(*) from hunt where hunt.id_bonushunt = bonus_hunt.id
) as nbbonus
from bonus_hunt
JOIN hunt on bonus_hunt.id = hunt.id_bonushunt 
GROUP BY id


SELECT id, (
  (SELECT SUM(payout) FROM hunt where hunt.id_bonushunt = bonus_hunt.id)-(SELECT start FROM bonus_hunt where bonus_hunt.id = hunt.id_bonushunt)
) as profitloss 
from bonus_hunt
JOIN hunt on bonus_hunt.id = hunt.id_bonushunt 
WHERE id = 4
GROUP BY id





SELECT title, start,date,(Select count(*) from hunt where hunt.id_bonushunt = bonus_hunt.id) as nbbonus, ((SELECT SUM(payout) FROM hunt where hunt.id_bonushunt = bonus_hunt.id)-(SELECT start FROM bonus_hunt where bonus_hunt.id = hunt.id_bonushunt)) as profitloss from bonus_hunt JOIN hunt on bonus_hunt.id = hunt.id_bonushunt GROUP BY id


SELECT id, ((SELECT SUM(payout) FROM hunt where hunt.id_bonushunt = bonus_hunt.id)-(SELECT start FROM bonus_hunt where bonus_hunt.id = hunt.id_bonushunt)) as profitloss from bonus_hunt JOIN hunt on bonus_hunt.id = hunt.id_bonushunt WHERE id=1 GROUP BY id

SELECT id_bonushunt, count(*) as NB_Bonus FROM hunt where id_bonushunt=1

SELECT start FROM bonus_hunt where id=1


SELECT hunt.id_bonushunt, slots.slot, slots.provider, hunt.bet_size, hunt.payout, hunt.multiplier
from hunt
join slots on hunt.id_slots = slots.id
where id_bonushunt = 1


select slot
FROM slots

SELECT id, title, start,date,(Select count(*) from hunt where hunt.id_bonushunt = bonus_hunt.id) as nbbonus, ((SELECT SUM(payout) FROM hunt where hunt.id_bonushunt = bonus_hunt.id)-(SELECT start FROM bonus_hunt where bonus_hunt.id = hunt.id_bonushunt)) as profitloss from bonus_hunt GROUP BY id
 
SELECT bonus_hunt.id
from bonus_hunt 
where title = "test"

SELECT id, title, start,date,(Select count(*) from hunt where hunt.id_bonushunt = bonus_hunt.id) as nbbonus from bonus_hunt group by id


SELECT ((Select sum(payout))/(Select count(*))/(Select count(*) from bonus_hunt)) from hunt



Select max(payout) as bestslot, (select slot from slots where hunt.id_slots = slots.id) as name
from hunt
join slots on hunt.id_slots = slots.id

Select min(payout) as worstslot, (select slot from slots where hunt.id_slots = slots.id) as name
from hunt
join slots on hunt.id_slots = slots.id


select title, (select slot from slots join slots on hunt.id_slots = slots.id where hunt.id_slots = slots.id), (Select max(payout) as bestslot from hunt where hunt.id_bonushunt = bonus_hunt.id)
from bonus_hunt
JOIN hunt on bonus_hunt.id = hunt.id_bonushunt 


select slot,max(payout) as best
from
(
select payout, slots.slot, bonus_hunt.id
from hunt
join slots on hunt.id_slots = slots.id
join bonus_hunt on hunt.id_bonushunt = bonus_hunt.id
)
where id = "1"

select sum(payout) from hunt where id_bonushunt = "1"




SELECT (bonus_hunt.start - SUM(hunt.payout)) as BE FROM hunt JOIN bonus_hunt on bonus_hunt.id = hunt.id_bonushunt where id_bonushunt=:id


SELECT ((bonus_hunt.start - SUM(hunt.payout)) / (SELECT COUNT(*) FROM hunt WHERE hunt.payout IS NULL)) FROM hunt JOIN bonus_hunt on bonus_hunt.id = hunt.id_bonushunt where id_bonushunt=:id



SELECT avg(hunt.payout) as AVG FROM hunt where id_bonushunt = "34"


SELECT ((SELECT ((bonus_hunt.start - SUM(hunt.payout)) / (SELECT COUNT(*) FROM hunt WHERE hunt.payout IS NULL)) FROM hunt JOIN bonus_hunt on bonus_hunt.id = hunt.id_bonushunt where id_bonushunt=:id) / avg(hunt.bet_size)) as BEX FROM hunt WHERE hunt.payout IS NULL



SELECT avg(hunt.multiplier) as AVGX FROM hunt where id_bonushunt=:id



SELECT COUNT(*) as Remain FROM hunt WHERE hunt.payout IS NULL and id_bonushunt=:id




SELECT COUNT(*) as cent FROM hunt WHERE hunt.multiplier > 100 and id_bonushunt=:id

SELECT provider FROM slots where id="144"