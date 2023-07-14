import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Lesson from './Lesson'
import Group from './Group'
import EducationLevel from './EducationLevel'

export default class GroupUserLesson extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public group_id: number

  @column()
  public lesson_id: number

  @column()
  public education_level_id: number

  @belongsTo(() => User,{
    localKey: 'id',
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>

  @belongsTo(() => EducationLevel,{
    localKey: 'id',
    foreignKey: 'education_level_id',
  })
  public education_level: BelongsTo<typeof EducationLevel>

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
