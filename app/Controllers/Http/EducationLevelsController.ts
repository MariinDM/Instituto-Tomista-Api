import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EducationLevel from 'App/Models/EducationLevel'
import EducationLevelValidator from 'App/Validators/EducationLevelValidator'

export default class EducationLevelsController {
  public async index({ auth, response }: HttpContextContract) {

    const logged = await auth.user

    if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });

    const educa = await EducationLevel.all()

    return response.ok({ message: 'Ok', educa })
  }

  public async store({ auth, request, response }: HttpContextContract) {

    const logged = await auth.user

    if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });

    try {

      var vali = await request.validate(EducationLevelValidator)
      await EducationLevel.create(vali)
      return response.ok({ message: 'Ok' })

    } catch (error) {
      console.log(error)

      return response.badRequest({ error: error.messages })

    }
  }

  public async show({ auth, params, response }: HttpContextContract) {

    const logged = await auth.user

    if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });

    try {

      const educa = await EducationLevel.query().where('id', params.id).orderBy('id', 'desc')
      return response.ok({ message: 'Ok', educa })

    } catch (error) {

      return response.ok({ error })

    }
  }

  public async update({ auth, params, response, request }: HttpContextContract) {

    const logged = await auth.user

    if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });

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

  public async destroy({ auth, params, response }: HttpContextContract) {

    const logged = await auth.user

    if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });

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
