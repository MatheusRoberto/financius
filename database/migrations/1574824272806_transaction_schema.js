'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransactionSchema extends Schema {
  up () {
    this.table('transactions', (table) => {
      table.boolean('active')
    })
  }

  down () {
    this.table('transactions', (table) => {
      // reverse alternations
    })
  }
}

module.exports = TransactionSchema
