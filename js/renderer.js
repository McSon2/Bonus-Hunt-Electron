document.addEventListener('DOMContentLoaded', async () =>{
    let nbonus = window.api.getNbonus();
    let divNames = document.getElementById("nbonus");
    let nameString = nbonus.map((elem) => {
        return elem.nbonus;
    });

    divNames.innerHTML = nameString;
})

document.addEventListener('DOMContentLoaded', async () =>{
    let TotalCost = window.api.getTotalCost();
    let divNames = document.getElementById("getTotalCost");
    let nameString = TotalCost.map((elem) => {
        return elem.totalcost;
    });

    divNames.innerHTML = "$" + nameString;
})
