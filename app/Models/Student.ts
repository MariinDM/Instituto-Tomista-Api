import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Group from './Group'

export default class Student extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public group_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    localKey: 'user_id',
    foreignKey: 'id',
  })
  public user: BelongsTo<typeof User>

  @belongsTo(() => Group, {
    localKey: 'id',
    foreignKey: 'group_id',
  })
  public group: BelongsTo<typeof Group>
  
}
