import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Grade from 'App/Models/Grade'
import GradeValidator from 'App/Validators/GradeValidator'

export default class GradesController {
  public async index({ auth, response }: HttpContextContract) {

    const logged = await auth.user

    if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });

    const grade = await Grade.all()

    return response.ok({ message: 'Ok', grade: grade })
  }

  public async store({ request, auth, response }: HttpContextContract) {

    const logged = await auth.user

    if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });
    try {

      var vali = await request.validate(GradeValidator)
      await Grade.create(vali)
      return response.ok({ message: 'Se creo el Grado correctamente' })

    } catch (error) {
      console.log(error)

      return response.badRequest({ error: error.messages })

    }

  }

  public async show({ auth, params, response }: HttpContextContract) {

    const logged = await auth.user

    if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });
    try {

      const grade = await Grade.query().where('id', params.id).orderBy('id', 'desc')
      return response.ok({ message: 'Ok', grade })

    } catch (error) {

      return response.ok({ error })

    }
  }

  public async update({ auth, params, response, request }: HttpContextContract) {

    const logged = await auth.user

    if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });
    const grade = await Grade.findOrFail(params.id)

    try {
      const vali = await request.only(['name'])

      grade.merge(vali)
      await grade.save()

      return response.ok({ message: 'Se actualizo el Grado' })
    } catch (error) {

      console.error(error)
      return response.badRequest({ error: error })

    }
  }

  public async destroy({ auth, params, response }: HttpContextContract) {

    const logged = await auth.user

    if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });
    const grade = await Grade.findOrFail(params.id)

    try {

      grade.active = !grade.active
      await grade.save()
      return response.ok({ message: 'Se desactivo el Grado' })

    } catch (error) {

      console.error(error)
      return response.badRequest({ error: error })

    }
  }
}
