import { DateTime } from 'luxon'
import { BaseModel, HasMany, ManyToMany, column, hasMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Question from './Question'
import TestQuestion from './TestQuestion'
import Evaluation from './Evaluation'

export default class Test extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public active: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Question, {
    localKey: 'id',
    pivotForeignKey: 'test_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'question_id',
    pivotTable: 'test_questions',
  })
  public questions: ManyToMany<typeof Question>

  @hasMany(() => TestQuestion,{
    localKey: 'id',
    foreignKey: 'test_id',
  })
  public test_questions: HasMany<typeof TestQuestion>

  @hasMany(() => Evaluation, {
    localKey: 'id',
    foreignKey: 'test_id',
  })
  public evaluations: HasMany<typeof Evaluation>
}
