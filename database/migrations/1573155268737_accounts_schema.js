'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AccountsSchema extends Schema {
  up () {
    this.table('accounts', (table) => {
      table
      .integer('bank_id')
      .unsigned()
      .references('id')
      .inTable('banks')
      .onUpdate('CASCADE')
    })
  }

  down () {
    this.table('accounts', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AccountsSchema
