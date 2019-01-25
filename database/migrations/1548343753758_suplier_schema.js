'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SuplierSchema extends Schema {
  up () {
    this.create('supliers', (table) => {
      table.increments()
      table.string('sup_businessname', 200)
      table.string('sup_code', 200).unique()
      table.string('sup_telephone', 200)
      table.string('sup_address', 200)
      table.string('sup_email', 200)
      table.string('sup_website', 200)
      table.integer('sup_status', 200).defaultTo(0)
      table.string('sup_industrytype', 200)
      table.text('sup_additional', 'mediumtext')

      table.integer('sup_userid').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('supliers')
  }
}

module.exports = SuplierSchema
