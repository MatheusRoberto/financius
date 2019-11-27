'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Card extends Model {

  payments() {
    return this.hasMany('App/Models/Payment');
  }
  
}

module.exports = Card
