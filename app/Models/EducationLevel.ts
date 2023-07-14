import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import GroupUserLesson from './GroupUserLesson'

export default class EducationLevel extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public active: boolean

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @hasMany(() => GroupUserLesson,{
    localKey: 'id',
    foreignKey: 'education_level_id',
  })
  public groupUserLessons: HasMany<typeof GroupUserLesson>

}
