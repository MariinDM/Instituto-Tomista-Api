import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Test from './Test'
import Question from './Question'

export default class TestQuestion extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public test_id: number

  @column()
  public question_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Test,{
    localKey: 'id',
    foreignKey: 'test_id',
  })
  public tests: BelongsTo<typeof Test>

  @belongsTo(() => Question,{
    localKey: 'id',
    foreignKey: 'question_id',
  })
  public questions: BelongsTo<typeof Question>
}
