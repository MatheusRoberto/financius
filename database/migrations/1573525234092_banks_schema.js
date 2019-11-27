'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BanksSchema extends Schema {
  up () {
    this.table('banks', (table) => {
      table.string('code', 5)
    })
  }

  down () {
    this.table('banks', (table) => {
      // reverse alternations
    })
  }
}

module.exports = BanksSchema
