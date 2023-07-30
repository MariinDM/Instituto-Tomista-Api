import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'evaluations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('cascade')

        table.integer('group_id')
        .unsigned()
        .references('id')
        .inTable('groups')
        .onDelete('cascade')

        table.integer('test_id')
        .unsigned()
        .references('id')
        .inTable('tests')
        .onDelete('cascade')

        table.string('date').notNullable()
        table.boolean('public').defaultTo(false)
        table.boolean('active').defaultTo(true)

        

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
