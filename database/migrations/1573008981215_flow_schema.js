'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FlowSchema extends Schema {
  up () {
    this.table('flows', (table) => {
      table.renameColumn('status', 'active')
    })
  }

  down () {
    this.table('flows', (table) => {
      // reverse alternations
    })
  }
}

module.exports = FlowSchema
