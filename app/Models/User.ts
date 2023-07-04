import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasOne, HasOne, HasMany, hasMany, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'
import UserProfile from './UserProfile'
import ApiToken from './ApiToken'
import GroupUserLesson from './GroupUserLesson'
import Lesson from './Lesson'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column()
  public role_id: number

  @column()
  public active: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasMany(() => ApiToken,{
    localKey: 'id',
    foreignKey: 'user_id',
  })
  public api_token: HasMany<typeof ApiToken>
  
  @hasOne(() => Role, {
    localKey:'role_id',
    foreignKey: 'id',
  })
  public role: HasOne<typeof Role>

  @hasOne(() => UserProfile, {
    localKey: 'id',
    foreignKey: 'user_id',
  })
  public profile: HasOne<typeof UserProfile>

  @manyToMany(() => Lesson, {
    localKey: 'id',
    pivotForeignKey: 'user_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'lesson_id',
    pivotTable: 'group_user_lessons',
  })
  public lessons: ManyToMany<typeof Lesson>

  @hasMany(() => GroupUserLesson,{
    localKey: 'id',
    foreignKey: 'user_id',
  })
  public groupUserLessons: HasMany<typeof GroupUserLesson>
}
