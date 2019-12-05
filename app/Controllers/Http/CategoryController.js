'use strict'

const Category = use('App/Models/Category');
const AuthorizationService = use('App/Services/AuthorizationService');
const Database = use('Database')

class CategoryController {

  async index({
    auth
  }) {
    const user = await auth.getUser();

    return await user.categories().where('active', true).fetch();
  }

  async store({
    request,
    response,
    auth
  }) {
    const user = await auth.getUser();
    const {
      name,
      type
    } = request.all();

    if (type === undefined || name === undefined) {
      return response
        .status(400)
        .send({
          message: {
            error: 'name e/ou type são campos obrigatórios!'
          }
        })
    }
    const category = new Category();
    category.fill({
      name,
      type,
      active: true,
    });
    await user.categories().save(category);
    return category;
  }

  async update({
    params,
    request,
    auth
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

    const {
      name,
      type
    } = request.only(['name', 'type']);

    const fields = {};

    fields.name = name !== null && name !== undefined ? name : category.name;
    fields.type = type !== null && type !== undefined ? type : category.type;

    category.merge(fields);
    await category.save();

    return category;
  }


  async destroy({
    params,
    auth
  }) {
    const user = await auth.getUser();

    let result = await Category.query().where({
      'id': params.id,
      'active': true
    }).fetch();

    const category = result.rows[0];

    AuthorizationService.verifyPermission(category, user);

    category.merge({
      active: false
    });

    result = await category.flows().fetch();
    for (let index = 0; index < result.rows.length; index++) {
      const element = result.rows[index];

      element.merge({
        active: false
      });

      element.save();
    }

    await category.save();
  }
}

module.exports = CategoryController
