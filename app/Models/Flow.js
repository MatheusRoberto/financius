'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Flow extends Model {

  category() {
    return this.belongsTo('App/Models/Category');
  }

  transactions() {
    return this.hasMany('App/Models/Transaction');
  }
}

module.exports = Flow
