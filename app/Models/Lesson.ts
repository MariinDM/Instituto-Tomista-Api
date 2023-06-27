import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import EducationLevel from './EducationLevel'

export default class Lesson extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public educa_level: number

  @column()
  public active: boolean

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @belongsTo(() => EducationLevel, {
    localKey: 'id',
    foreignKey: 'educa_level',
  })
  public educa: BelongsTo<typeof EducationLevel>
}
