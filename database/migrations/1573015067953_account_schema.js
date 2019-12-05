'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AccountSchema extends Schema {
  up () {
    this.create('accounts', (table) => {
      table.increments()
      table.string('agency', 15).notNullable()
      table.string('account', 15).notNullable()
      table.boolean('active').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
  }
}

module.exports = AccountSchema
