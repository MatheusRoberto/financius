'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.dropColumn('username')
    })
  }

  down () {
    this.table('users', (table) => {

    })
  }
}

module.exports = UsersSchema
