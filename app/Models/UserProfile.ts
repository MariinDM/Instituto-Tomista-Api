import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class UserProfile extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public name: string

  @column()
  public last_name: string

  @column()
  public image: string

  @column()
  public birthday: string

  @column()
  public street: string

  @column()
  public number: string

  @column()
  public suburb: string

  @column()
  public city: string

  @column()
  public state: string

  @column()
  public zip_code: string

  @column()
  public phone: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @hasOne(() => User, {
    localKey: 'user_id',
    foreignKey: 'id',
  })
  public section: HasOne<typeof User>

}
