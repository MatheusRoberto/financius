'use strict'

const Flow = use('App/Models/Flow');
const Transaction = use('App/Models/Transaction');
const Category = use('App/Models/Category');

const AuthorizationService = use('App/Services/AuthorizationService');

const moment = use('moment');


class TransactionController {

  async show({
    auth,
    params
  }) {

    const user = await auth.getUser();
    const {
      id
    } = params;

    let result = await Transaction.query().where({
      'id': id,
      'active': true
    }).fetch();

    const transaction = result.rows[0];

    result = await Flow.query().where({
      'id': transaction !== undefined ? transaction.flow_id : 0,
      'active': true
    }).fetch();

    const flow = result.rows[0];

    result = await Category.query().where({
      'id': flow !== undefined ? flow.category_id : 0,
      'active': true
    }).fetch();

    const category = result.rows[0];

    AuthorizationService.verifyPermission(category, user);

    return transaction;

  }

  async update({
    params,
    request,
    response,
    auth,
  }) {
    const user = await auth.getUser();

    let result = await Transaction.query().where({
      'id': params.id,
      'active': true
    }).fetch();

    const transaction = result.rows[0];

    result = await Flow.query().where({
      'id': transaction !== undefined ? transaction.flow_id : 0,
      'active': true
    }).fetch();

    const flow = result.rows[0];

    result = await Category.query().where({
      'id': flow !== undefined ? flow.category_id : 0,
      'active': true
    }).fetch();

    const category = result.rows[0];

    AuthorizationService.verifyPermission(category, user);

    const {
      nexts,
      day
    } = request.all();

    if (typeof (nexts) === "boolean" && nexts) {
      const transactions = await Transaction.query()
        .where('id', '>=', params.id)
        .andWhere('active', true)
        .andWhere('flow_id', transaction.flow_id).fetch();

      let d;
      if (day !== undefined) {
        d = moment(day, "YYYY-MM-DD");
      }

      transactions.rows[0].merge(request.only([
        'complete'
      ]));

      for (let index = 0; index < transactions.rows.length; index++) {
        const element = transactions.rows[index];

        element.merge(request.only(['name',
          'value',
          'payment_id'
        ]), {
          day: d !== undefined ? d : element.day,
        });

        await element.save();

      }
      return transactions;
    } else {
      transaction.merge(request.only(['name',
        'value',
        'payment_id',
        'complete',
        'day'
      ]));

      await transaction.save();

      return transaction;
    }
  }

  async destroy({
    params,
    request,
    auth
  }) {
    const user = await auth.getUser();

    let result = await Transaction.query().where({
      'id': params.id,
      'active': true
    }).fetch();

    const transaction = result.rows[0];

    result = await Flow.query().where({
      'id': transaction !== undefined ? transaction.flow_id : 0,
      'active': true
    }).fetch();

    const flow = result.rows[0];

    result = await Category.query().where({
      'id': flow !== undefined ? flow.category_id : 0,
      'active': true
    }).fetch();

    const category = result.rows[0];

    AuthorizationService.verifyPermission(category, user);

    const {
      nexts
    } = request.all();

    if (typeof (nexts) === "boolean" && nexts) {
      const transactions = await Transaction.query()
        .where('id', '>=', params.id)
        .andWhere('active', true)
        .andWhere('flow_id', transaction.flow_id).fetch();

      for (let index = 0; index < transactions.rows.length; index++) {
        const element = transactions.rows[index];

        element.merge({
          active: false,
        });

        await element.save();
      }
    } else {
      transaction.merge({
        active: false
      });

      await transaction.save();
    }

  }

  async listDate({
    auth,
    request
  }) {
    const user = await auth.getUser();
    const {
      init,
      finished
    } = request.all();

    return await Transaction.query().where({
        'active': true
      })
      .whereBetween('transactions.day', [init, finished]).fetch();
  }
}

module.exports = TransactionController
