const axios = require('axios');
const db = require('../db/db');


// таск на обновление курсов валют каждую минуту
const updateCurrencies = async () => {
    try {
        console.log('Updating currencies');

        // /USD & EUR
        await axios.get('https://www.cbr-xml-daily.ru/daily_json.js').then((res) => {
            if(res){
                const {EUR, USD} = res.data.Valute;
                db.push("/shop/currencies/EUR", EUR.Value);
                db.push("/shop/currencies/USD", USD.Value);
                console.log(db.getData("/shop/currencies"));
                console.log("Currencies updated");
            }


        }).catch((err) => {
            console.log('Error fetching USD or EUR price', err);
        });

    } catch (e) {
        console.log(`Error updating currencies${e}`);
    }
};
// EVERY 1min
setInterval(async () => {
    await updateCurrencies();
}, 60000);
