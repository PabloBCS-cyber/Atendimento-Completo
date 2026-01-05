// Example: Get weather info from Open-Meteo API
async function getmoedas() {
  try{
    const response = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,JPY-BRL,GBP-BRL,ARS-BRL,CHF-BRL,CAD-BRL,CNY-BRL");
    const data = await response.json();
    console.log(data);
    var mens1 = data.USDBRL.low;
    var mens2 = "USD - BRl = R$" + mens1;
    var mens3 = data.EURBRL.low;
    var mens4 = "EUR - BRl = R$" + mens3;
    var mens5 = data.JPYBRL.low;
    var mens6 = "JPY - BRl = R$" + mens5;
    var mens7 = data.CNYBRL.low;
    var mens8 = "CNY - BRl = R$" + mens7;
    var mens9 = data.ARSBRL.low;
    var mens10 = "ARS - BRL = R$" + mens9;
    document.getElementById("Ola").textContent =  mens2 + "  |  " + mens4 + " | " + mens6 + " | " + mens8 + " | " + mens10 + " | "+ mens2 + "  |  " + mens4 + " | " + mens6 + " | " + mens8 + " | " + mens10;
  }
  catch(error){ 
    console.error(error);
  }
}
getmoedas();
