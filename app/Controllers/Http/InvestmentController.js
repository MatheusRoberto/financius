'use strict'

class InvestmentController {

  async simulate({
    request
  }) {
    const {
      initial,
      contribute,
      time
    } = request.all();

    let montantePoupanca, montanteTesouro;
    const listPoupanca = [],
      listTesouro = [];
    if (contribute <= 0) {
      montantePoupanca = initial * Math.pow((1 + 0.035), time);
      montanteTesouro = initial * Math.pow((1 + 0.049), time);

    } else {
      listPoupanca.push({
        mes: 0,
        initial,
        totalMes: (initial * Math.pow((1 + 0.035), 1)),
        ganho: (initial * Math.pow((1 + 0.035), 1) - initial)
      });
      listTesouro.push({
        mes: 0,
        initial,
        totalMes: (initial * Math.pow((1 + 0.049), 1)),
        ganho: (initial * Math.pow((1 + 0.049), 1) - initial)
      });
      for (let index = 1; index < time; index++) {
        listPoupanca.push({
          mes: index,
          initial: listPoupanca[index - 1].totalMes + contribute,
          totalMes: ((listPoupanca[index - 1].totalMes + contribute) * Math.pow((1 + 0.035), 1)),
          ganho: ((listPoupanca[index - 1].totalMes + contribute) * Math.pow((1 + 0.035), 1) - listPoupanca[index - 1].totalMes)
        });
        listTesouro.push({
          mes: index,
          initial: listTesouro[index - 1].totalMes + contribute,
          totalMes: ((listTesouro[index - 1].totalMes + contribute) * Math.pow((1 + 0.049), 1)),
          ganho: ((listTesouro[index - 1].totalMes + contribute) * Math.pow((1 + 0.049), 1) - listTesouro[index - 1].totalMes)
        });
      }

      listPoupanca.push({
        "mes": "final",
        initial,
        totalInvest: (initial + contribute * time),
        total: listPoupanca[listPoupanca.length - 1].totalMes,
        ganho: (listPoupanca[listPoupanca.length - 1].totalMes - (initial + contribute * time))
      });

      listTesouro.push({
        "mes": "final",
        initial,
        totalInvest: (initial + contribute * time),
        total: listTesouro[listTesouro.length - 1].totalMes,
        ganho: (listTesouro[listTesouro.length - 1].totalMes - (initial + contribute * time))
      });

    }

    if (montantePoupanca !== undefined && montanteTesouro !== undefined) {
      return {
        "montantePoupanca": {initial, total: montantePoupanca, ganho: montantePoupanca - initial},
        "montanteTesouro": {initial, total: montanteTesouro, ganho: montanteTesouro - initial}
      }
    }
    return {
      "totalPoupanca": listPoupanca,
      "totalTesouro": listTesouro
    };
  }
}

module.exports = InvestmentController
