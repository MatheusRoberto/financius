'use strict'

const Category = use('App/Models/Category');
const Flow = use('App/Models/Flow');
const Payment = use('App/Models/Payment');
const Transaction = use('App/Models/Transaction');
const Database = use('Database');
const moment = use('moment');

const AuthorizationService = use('App/Services/AuthorizationService');


class FlowController {

  async index({
    auth,
    params
  }) {
    const user = await auth.getUser();
    const {
      id
    } = params;

    const result = await Category.query().where({
      'id': id,
      'active': true
    }).fetch();
    const category = result.rows[0];
    AuthorizationService.verifyPermission(category, user);

    const list = [];
    const flows = await Flow.query().where({
      'category_id': category.id,
      'active': true
    }).fetch();

    for (let index = 0; index < flows.rows.length; index++) {
      const flow = flows.rows[index];
      const transcations = await Transaction.query().where({
        'flow_id': flow.id,
        'active': true,
      }).fetch();
      list.push({
        flow,
        transcations,
      });
    }

    return list;
  }

  async store({
    request,
    params,
    auth
  }) {
    const user = await auth.getUser();
    const {
      name,
      value,
      operation,
      day,
      complete,
      payment_id,
      repeat
    } = request.all();
    const {
      id
    } = params;

    if (name === undefined ||
      operation === undefined ||
      day === undefined ||
      complete === undefined ||
      !Number.isInteger(payment_id) ||
      !Number.isInteger(repeat) ||
      typeof (value) === 'number') {
      return response
        .status(400)
        .send({
          message: {
            error: 'Nome, Operação, Dia, completado, id da forma Pagamento, Quantidade de Repetição e/ou Valor da Conta são campos obrigatórios!'
          }
        });
    }

    let result = await Category.query().where({
      'id': id,
      'active': true
    }).fetch();

    const category = result.rows[0];
    AuthorizationService.verifyPermission(category, user);

    result = await Payment.query().where({
      'id': payment_id,
      'active': true
    }).fetch();

    const payment = result.rows[0];
    AuthorizationService.verifyPermission(payment, user);

    const flow = new Flow();
    flow.fill({
      name,
      value: (value * repeat),
    });

    const list = [];
    const transaction = new Transaction();
    if (repeat > 1) {
      let d = moment(day, "YYYY-MM-DD");
      for (let i = 0; i < repeat; i++) {
        const t = new Transaction();
        t.fill({
          operation,
          day: d.format('YYYY-MM-DD'),
          complete: moment().isAfter(d),
          payment_id: payment.id,
          value: value,
          active: true,
        });
        d.add(1, 'M');
        list.push(t);
      }
    } else {
      transaction.fill({
        operation,
        day,
        complete,
        payment_id: payment.id,
        value,
        active: true,
      });
    }

    await category.flows().save(flow);

    if (list.length > 0) {

      for (let index = 0; index < list.length; index++) {
        const element = list[index];
        await flow.transactions().save(element);
      }

      return {
        flow,
        transactions: list
      };

    } else {

      await flow.transactions().save(transaction);

      return {
        flow,
        transaction
      };
    }
  }

  async destroy({
    params,
    auth
  }) {
    const user = await auth.getUser();

    const result = await Flow.query().where({
      'id': params.id,
      'active': true
    }).fetch();

    const flow = result.rows[0];
    let category;
    if (flow !== undefined) {
      category = await flow.category().fetch();
    } else {
      category = new Category();
    }

    AuthorizationService.verifyPermission(category, user);

    flow.merge({
      active: false
    });

    const transactions = await flow.transactions().fetch();

    for (let index = 0; index < transactions.rows.length; index++) {
      const element = transactions.rows[index];
      
      element.merge({
        active: false,
      });

      await element.save();
    }

    await flow.save();
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

    return await Database
      .table('transactions')
      .innerJoin('flows', 'transactions.flow_id', 'flows.id')
      .innerJoin('categories', 'flows.category_id', 'categories.id')
      .where({
        'categories.active': true,
        'categories.user_id': user.id,
        'flows.active': true,
        'transactions.active': true,
      })
      .whereBetween('transactions.day', [init, finished]);;
  }

  async listFlow({
    auth,
    params
  }) {
    const user = await auth.getUser();
    const {
      id
    } = params;

    let result = await Flow.query().where({
      'id': id,
      'active': true
    }).fetch();

    const flow = result.rows[0];

    result = await Category.query().where({
      'id': flow.category_id,
      'active': true
    }).fetch();

    const category = result.rows[0];
    AuthorizationService.verifyPermission(category, user);

    return {
      flow,
      transcations: await Transaction.query().where({
        'flow_id': flow.id
      }).fetch()
    }
  }
}

module.exports = FlowController
