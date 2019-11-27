'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FlowSchema extends Schema {
  up () {
    this.alter('flows', (table) => {
      table.boolean('status').defaultTo(true)
    })
  }

  down () {

  }
}

module.exports = FlowSchema
