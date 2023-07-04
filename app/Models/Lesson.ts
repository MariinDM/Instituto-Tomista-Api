import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, ManyToMany, belongsTo, column, hasMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import EducationLevel from './EducationLevel'
import GroupUserLesson from './GroupUserLesson'
import Group from './Group'

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

  @manyToMany(() => Group, {
    localKey: 'id',
    pivotForeignKey: 'lesson_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'group_id',
    pivotTable: 'group_user_lessons',
  })
  public groups: ManyToMany<typeof Group>

  @hasMany(() => GroupUserLesson,{
    localKey: 'id',
    foreignKey: 'lesson_id',
  })
  public groupUserLessons: HasMany<typeof GroupUserLesson>
}
