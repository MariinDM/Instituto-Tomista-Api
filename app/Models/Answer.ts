import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Evaluation from './Evaluation'
import Student from './Student'
import Question from './Question'

export default class Answer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public evaluation_id: number

  @column()
  public student_id: number

  @column()
  public question_id: number

  @column()
  public score: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Evaluation, {
    localKey: 'id',
    foreignKey: 'evaluation_id',
  })
  public evaluation: BelongsTo<typeof Evaluation>

  @belongsTo(() => Student, {
    localKey: 'id',
    foreignKey: 'student_id',
  })
  public student: BelongsTo<typeof Student>

  @belongsTo(() => Question, {
    localKey: 'id',
    foreignKey: 'question_id',
  })
  public quetion: BelongsTo<typeof Question>
}
