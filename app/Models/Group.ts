import { DateTime } from 'luxon'
import { BaseModel, HasMany, HasOne, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Grade from './Grade'
import Secction from './Secction'
import GroupUserLesson from './GroupUserLesson'
import Student from './Student'

export default class Group extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public section_id: number

  @column()
  public grade_id: number

  @column()
  public active: boolean

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @hasOne(() => Grade, {
    localKey: 'grade_id',
    foreignKey: 'id',
  })
  public grade: HasOne<typeof Grade>

  @hasOne(() => Secction, {
    localKey: 'section_id',
    foreignKey: 'id',
  })
  public section: HasOne<typeof Secction>

  @hasMany(() => GroupUserLesson, {
    localKey: 'id',
    foreignKey: 'group_id',
  })
  public groupUserLessons: HasMany<typeof GroupUserLesson>

  @hasMany(() => Student, {
    localKey: 'group_id',
    foreignKey: 'id',
  })
  public students: HasMany<typeof Student>
}
