import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserValidator from 'App/Validators/UserValidator'

export default class UsersController {
  public async index({ response }: HttpContextContract) {

    const users = await User.query()
      .orderBy('id', 'desc')
      .preload('role') 
    return response.ok({ message: 'Ok', users })

  }

  public async store({ response, request }: HttpContextContract) {

    try {
      var vali = await request.validate(UserValidator)
    } catch (error) {
      return response.badRequest({ error: error.messages })
    }

    await User.create(vali)

    return response.ok({ message: 'Ok' })

  }

  public async show({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
