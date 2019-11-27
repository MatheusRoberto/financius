'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Payment extends Model {

  user() {
    return this.belongsTo('App/Models/User');
  }

  card() {
    return this.belongsTo('App/Models/Card');
  }

  account() {
    return this.belongsTo('App/Models/Account');
  }

  transactions() {
    return this.hasMany('App/Models/Transaction');
  }

}

module.exports = Payment
