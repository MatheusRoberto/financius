'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Transaction extends Model {

  payment() {
    return this.belongsTo('App/Models/Payment');
  }
  
  flow() {
    return this.belongsTo('App/Models/Flow');
  }
}

module.exports = Transaction
