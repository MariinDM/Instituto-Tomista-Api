import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'test_questions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      
      table.integer('test_id')
        .unsigned()
        .references('id')
        .inTable('tests')
        .onDelete('CASCADE')

      table.integer('question_id')
        .unsigned()
        .references('id')
        .inTable('questions')
        .onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
