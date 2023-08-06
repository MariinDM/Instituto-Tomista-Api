import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Test from './Test'
import Group from './Group'
import Answer from './Answer'

export default class Evaluation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public group_id: number

  @column()
  public test_id: number

  @column()
  public date: number

  @column()
  public public: boolean

  @column()
  public active: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    localKey: 'id',
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>

  @belongsTo(() => Test, {
    localKey: 'id',
    foreignKey: 'test_id',
  })
  public test: BelongsTo<typeof Test>

  @belongsTo(() => Group, {
    localKey: 'id',
    foreignKey: 'group_id',
  })
  public group: BelongsTo<typeof Group>

  @hasMany(() => Answer,{
    localKey: 'id',
    foreignKey: 'evaluation_id',
  })
  public answers: HasMany<typeof Answer>
}
