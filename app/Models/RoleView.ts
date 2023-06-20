import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import View from './View'
import Role from './Role'

export default class RoleView extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public role_id: number

  @column()
  public view_id: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @belongsTo(() => View,{
    localKey: 'id',
    foreignKey: 'view_id',
  })
  public views: BelongsTo<typeof View>

  @belongsTo(() => Role,{
    localKey: 'id',
    foreignKey: 'role_id',
  })
  public roles: BelongsTo<typeof Role>
}
