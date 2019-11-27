'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CardSchema extends Schema {
  up () {
    this.table('cards', (table) => {
      table.dropColumn('flag')
    })
  }

  down () {
    this.table('cards', (table) => {
      // reverse alternations
    })
  }
}

module.exports = CardSchema
