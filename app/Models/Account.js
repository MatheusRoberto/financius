'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Account extends Model {
  bank() {
    return this.belongsTo('App/Models/Bank');
  }
}

module.exports = Account
