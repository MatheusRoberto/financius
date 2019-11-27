'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransactionsSchema extends Schema {
  up() {
    this.create('transactions', (table) => {
      table.increments()
      table.string('operation', 20)
      table.date('day')
      table.boolean('complete')
      table
        .integer('flow_id')
        .unsigned()
        .references('id')
        .inTable('flows')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('payment_id')
        .unsigned()
        .references('id')
        .inTable('payments')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('transactions')
  }
}

module.exports = TransactionsSchema
