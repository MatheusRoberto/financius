'use strict'

const axios = use('axios');

class CurrencyController {

  async listCurrency({}) {
    const currency = [];
    await axios.get('https://economia.awesomeapi.com.br/all')
      .then(function (response) {
        const {
          USD,
          USDT,
          CAD,
          EUR,
          AUD
        } = response.data;
        currency.push(USD);
        currency.push(USDT);
        currency.push(CAD);
        currency.push(EUR);
        currency.push(AUD);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        currency.push(error);
      });

    currency.forEach(element => {
      delete element.code;
      delete element.codein;
      delete element.timestamp;
      delete element.varBid
      element['buy'] = element.bid;
      delete element.bid;
      element['sale'] = element.ask;
      delete element.ask;

    });
    return currency;
  }

  async convertCurrency({
    request,
  }) {
    const {
      currency,
      value
    } = request.all();

    const list = currency.replace(/\s/g, '').split(',');

    let converts = [];

    await axios.get('https://economia.awesomeapi.com.br/all')
      .then(function (response) {
        list.forEach(element => {
          const cur = response.data[`${element}`];

          if (cur === undefined) return;

          const valueBuy = parseFloat(cur.bid.replace(',', '.'));
          const conversion = (value / valueBuy).toFixed(2);
          const cure = {
            "code": cur.code,
            "name": cur.name,
            "date": cur.create_date,
            value,
            "valueBuy": cur.bid,
            conversion
          };
          converts.push(cure);
        });

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    //console.log(converts);
    return converts;
  }
}

module.exports = CurrencyController
