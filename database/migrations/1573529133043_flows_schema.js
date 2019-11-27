'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FlowsSchema extends Schema {
  up () {
    this.table('flows', (table) => {
      table.boolean('active').defaultTo(true)
    })
  }

  down () {
    this.table('flows', (table) => {
      // reverse alternations
    })
  }
}

module.exports = FlowsSchema
