'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PaymentSchema extends Schema {
  up() {
    this.drop('payments')
    this.create('payments', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('card_id')
        .unsigned()
        .references('id')
        .inTable('cards')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('account_id')
        .unsigned()
        .references('id')
        .inTable('accounts')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    
  }
}

module.exports = PaymentSchema
