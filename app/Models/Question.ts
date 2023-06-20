import { DateTime } from 'luxon'
import { BaseModel, HasMany, ManyToMany, column, hasMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Test from './Test'
import TestQuestion from './TestQuestion'


export default class Question extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public active: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Test, {
    localKey: 'id',
    pivotForeignKey: 'question_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'test_id',
    pivotTable: 'test_questions',
  })
  public tests: ManyToMany<typeof Test>

  @hasMany(() => TestQuestion,{
    localKey: 'id',
    foreignKey: 'question_id',
  })
  public test_questions: HasMany<typeof TestQuestion>
}
