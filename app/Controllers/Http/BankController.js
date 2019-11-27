'use strict'

const Bank = use('App/Models/Bank');

const AuthorizationService = use('App/Services/AuthorizationService');

class BankController {

  async index({}) {
    return await Bank.query().where('active', true).fetch();
  }

  async show({
    response,
    auth,
    params
  }) {
    const {
      id
    } = params;

    const user = await auth.getUser();

    const result = await Bank.query().where({
      'id': id,
      'active': true
    }).fetch();

    const bank = result.rows[0];
    if (bank === undefined) {
      return response.status(404).json({
        error: 'O recurso não existe',
      });
    }
    return bank;
  }

  async store({
    request,
    response
  }) {
    const {
      code,
      name,
      document
    } = request.only(['code', 'name', 'document']);

    if (name === undefined || code === undefined ) {
      return response
        .status(400)
        .send({
          message: {
            error: 'nome e/ou código são campos obrigatórios!'
          }
        })
    }

    return await Bank.create({
      code,
      name,
      document,
      active: true,
    });

  }

  async storeJSON({
    request
  }) {
    const {
      banks
    } = request.all();

    const list = [];

    for (const element of banks) {
      const bank = {
        code: element.Code,
        name: element.Name,
        document: element.Document,
        active: true
      };

      await Bank.create(bank);
      list.push(bank);
    }

    return list;
  }

  async update({
    params,
    request,
  }) {
    const {
      id
    } = params;

    const result = await Bank.query().where({
      'id': id,
      'active': true
    }).fetch();

    const bank = result.rows[0];

    bank.merge(request.only([
      'name',
      'document',
      'code',
    ]));

    await bank.save();
    return bank;

  }

  async destroy({
    params,
  }) {
    const result = await Bank.query().where({
      'id': params.id,
      'active': true
    }).fetch();

    const bank = result.rows[0];

    bank.merge({
      active: false
    });

    await bank.save();

  }
}

module.exports = BankController
