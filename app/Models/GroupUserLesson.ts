import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Lesson from './Lesson'
import Group from './Group'

export default class GroupUserLesson extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public group_id: number

  @column()
  public lesson_id: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @belongsTo(() => User,{
    localKey: 'id',
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>

  @belongsTo(() => Group,{
    localKey: 'id',
    foreignKey: 'group_id',
  })
  public group: BelongsTo<typeof Group>

  @belongsTo(() => Lesson,{
    localKey: 'id',
    foreignKey: 'lesson_id',
  })
  public lesson: BelongsTo<typeof Lesson>
}
