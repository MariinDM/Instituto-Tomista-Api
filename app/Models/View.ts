import { DateTime } from 'luxon'
import { BaseModel, HasMany, ManyToMany, column, hasMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'
import RoleView from './RoleView'

export default class View extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string


  @column()
  public route: string


  @column()
  public icon: string

  @column()
  public active: boolean


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @manyToMany(() => Role, {
    localKey: 'id',
    pivotForeignKey: 'view_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'role_id',
    pivotTable: 'role_views',
  })
  public roles: ManyToMany<typeof Role>

  @hasMany(() => RoleView,{
    localKey: 'id',
    foreignKey: 'view_id',
  })
  public role_view: HasMany<typeof RoleView>
}
