'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FlowSchema extends Schema {
  up () {
    this.create('flows', (table) => {
      table.increments()
      table.string('name', 254).notNullable()
      table.float('value').notNullable()
      table.string('operation', 60).notNullable()
      table.date('day').notNullable()
      table
      .integer('category_id')
      .unsigned()
      .references('id')
      .inTable('categories')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('flows')
  }
}

module.exports = FlowSchema
