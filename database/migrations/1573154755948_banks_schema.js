'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BanksSchema extends Schema {
  up () {
    this.create('banks', (table) => {
      table.increments()
      table.string('name', 254).notNullable()
      table.string('document', 100)
      table.boolean('active').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('banks')
  }
}

module.exports = BanksSchema
