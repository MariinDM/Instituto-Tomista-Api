import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EducationLevel from 'App/Models/EducationLevel'
import EducationLevelValidator from 'App/Validators/EducationLevelValidator'

export default class EducationLevelsController {
  public async index({ response }: HttpContextContract) {
    const educa = await EducationLevel.all()

    // console.log(roles.find(n => n.id == 4))

    return response.ok({ message: 'Ok', educa })
  }

  public async store({ request, response }: HttpContextContract) {
    try {

      var vali = await request.validate(EducationLevelValidator)
      await EducationLevel.create(vali)
      return response.ok({ message: 'Ok' })

    } catch (error) {
      console.log(error)

      return response.badRequest({ error: error.messages })

    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {

      const educa = await EducationLevel.query().where('id', params.id).orderBy('id', 'desc')
      return response.ok({ message: 'Ok', educa })

    } catch (error) {

      return response.ok({ error })

    }
  }

  public async update({ params, response, request }: HttpContextContract) {
    const educa = await EducationLevel.findOrFail(params.id)

    try {
      const vali = await request.only(['name', 'description'])

      educa.merge(vali)
      await educa.save()

      return response.ok({ message: 'Ok' })
    } catch (error) {

      console.error(error)
      return response.badRequest({ error: error })

    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const edca = await EducationLevel.findOrFail(params.id)

    try {

      edca.active = !edca.active
      await edca.save()
      return response.ok({ message: 'Ok' })

    } catch (error) {

      console.error(error)
      return response.badRequest({ error: error })
    }
  }
}
