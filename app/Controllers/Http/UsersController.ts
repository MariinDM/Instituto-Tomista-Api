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
      return response.badRequest({ error: error })
    }

    await User.create(vali)

    return response.ok({ message: 'Ok' })

  }

  public async show({ params, response }: HttpContextContract) {

    const user = await User.query().where('id', params.id).orderBy('id', 'desc')

    return response.ok({ message: 'Ok', user })

  }

  public async update({ params, response, request }: HttpContextContract) {

    const user = await User.findOrFail(params.id)

    try {
      const vali = await request.only(['role_id'])

      user.merge(vali)
      await user.save()

      return response.ok({ message: 'Ok' })
    } catch (error) {
      console.error(error)

      return response.badRequest({ error: error })
    }

  }

  public async destroy({ params, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    try {

      user.active = !user.active
      await user.save()
      return response.ok({ message: 'Ok' })

    } catch (error) {

      console.error(error)
      return response.badRequest({ error: error })

    }
  }
}
