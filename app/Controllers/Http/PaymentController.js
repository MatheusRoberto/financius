'use strict'

const Payment = use('App/Models/Payment');
const Account = use('App/Models/Account');
const Card = use('App/Models/Card');

const AuthorizationService = use('App/Services/AuthorizationService');


class PaymentController {

  async index({
    auth
  }) {
    const user = await auth.getUser();

    return await user.payments().where('active', true).fetch();
  }

  async show({
    auth,
    params
  }) {
    const {
      id
    } = params;

    const user = await auth.getUser();
    const result = await Payment.query().where({
      'id': id,
      'active': true
    }).fetch();

    const payment = result.rows[0];
    AuthorizationService.verifyPermission(payment, user);

    if (payment.account_id !== null) {
      return await Account.query().where({
        'id': payment.account_id,
        'active': true,
      }).fetch();
    } else {
      return await Card.query().where({
        'id': payment.card_id,
        'active': true,
      }).fetch();
    }
  }

  async store({
    request,
    response,
    auth
  }) {
    const user = await auth.getUser();
    const paymentInfo = request.only([
      'agency',
      'account',
      'bank_id',
      'number',
      'flag',
      'type',
      'limit'
    ]);

    paymentInfo.active = true;

    let account, card;
    const payment = new Payment();

    if (paymentInfo.bank_id !== undefined) {
      if (paymentInfo.agency === undefined ||
        paymentInfo.account === undefined ||
        paymentInfo.bank_id === undefined ||
        !Number.isInteger(paymentInfo.bank_id)) {
        return response
          .status(400)
          .send({
            message: {
              error: 'Agência, Banco e/ou Número da Conta são campos obrigatórios!'
            }
          });
      }
      delete paymentInfo.number;
      delete paymentInfo.flag;
      delete paymentInfo.limit;
      delete paymentInfo.type;


      account = await Account.create(paymentInfo);
      payment.fill({
        account_id: account.id,
      });
    } else {
      if (paymentInfo.number === undefined ||
        paymentInfo.flag === undefined ||
        paymentInfo.type === undefined) {
        return response
          .status(400)
          .send({
            message: {
              error: 'numero cartão, bandeira e/ou tipo são campos obrigatórios!'
            }
          });
      } else if (paymentInfo.type === 'credit' && paymentInfo.limit === undefined) {
        return response
          .status(400)
          .send({
            message: {
              error: 'numero cartão, bandeira, tipo e/ou limite são campos obrigatórios!'
            }
          });
      }
      delete paymentInfo.agency;
      delete paymentInfo.account;
      delete paymentInfo.bank_id;

      card = await Card.create(paymentInfo);
      payment.fill({
        card_id: card.id,
      });
    }

    await user.payments().save(payment);

    return payment;
  }

  async update({
    params,
    request,
    response,
    auth
  }) {
    const user = await auth.getUser();
    const {
      id
    } = params;
    const result = await Payment.query().where({
      'id': id,
      'active': true
    }).fetch();

    const payment = result.rows[0];

    AuthorizationService.verifyPermission(payment, user);

    let pay;
    if (payment.card_id !== null) {
      const card = await Card.find(payment.card_id);
      pay = card;

      const {
        number,
        flag,
        type,
        limit
      } = request.only(['number',
        'flag',
        'type',
        'limit'
      ]);

      const fields = {};

      fields.number = number !== null && number !== undefined ? number : card.number;
      fields.flag = flag !== null && flag !== undefined ? flag : card.flag;
      fields.type = type !== null && type !== undefined ? type : card.type;
      fields.limit = limit !== null && limit !== undefined ? limit : card.limit;

      card.merge(fields);
      await card.save();
    } else {
      const accoun = await Account.find(payment.account_id);
      pay = accoun;
      const {
        agency,
        account,
        bank_id
      } = request.all();
      if (!Number.isInteger(bank_id)) {
        return response
          .status(400)
          .send({
            message: {
              error: 'Banco inválido!'
            }
          });
      }
      accoun.merge(request.only([
        agency,
        account,
        bank_id,
      ]));
      await accoun.save();
    }

    return {
      payment,
      pay
    };
  }

  async destroy({
    params,
    auth
  }) {
    const user = await auth.getUser();

    const result = await Payment.query().where({
      'id': params.id,
      'active': true
    }).fetch();

    const payment = result.rows[0];

    AuthorizationService.verifyPermission(payment, user);

    payment.merge({
      active: false
    });

    await payment.save();

    if (payment.card_id !== null) {
      const card = await Card.find(payment.card_id);
      card.merge({
        active: false
      });
      await card.save();
    } else {
      const account = await Account.find(payment.account_id);
      account.merge({
        active: false
      });
      await account.save();
    }
  }
}

module.exports = PaymentController
