import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Lesson from 'App/Models/Lesson';
import LessonValidator from 'App/Validators/LessonValidator';

export default class LessonsController {
  public async index({ auth, response }: HttpContextContract) {

    const logged = await auth.user

    if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });

    const lesson = await Lesson.all()

    return response.ok({ message: 'Ok', lesson })

  }

  public async store({ auth, response, request }: HttpContextContract) {

    const logged = await auth.user

    if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });
    try {

      var vali = await request.validate(LessonValidator)
      await Lesson.create(vali)
      return response.ok({ message: 'Se creo la materia correctamente' })

    } catch (error) {
      console.log(error)

      return response.badRequest({ error: error.messages })

    }
  }

  public async show({ auth, response, params }: HttpContextContract) {
    const logged = await auth.user

    if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });
    try {

      const grade = await Lesson.query().where('id', params.id).orderBy('id', 'desc')
      return response.ok({ message: 'Ok', grade })

    } catch (error) {

      return response.ok({ error })

    }
  }

  public async update({ auth, request, response, params }: HttpContextContract) {
    const logged = await auth.user

    if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });
    const grade = await Lesson.findOrFail(params.id)

    try {
      const vali = await request.only(['name', 'description', 'educa_level'])

      grade.merge(vali)
      await grade.save()

      return response.ok({ message: 'Se actualizo la materia' })
    } catch (error) {

      console.error(error)
      return response.badRequest({ error: error })

    }
  }

  public async destroy({ auth, response, params }: HttpContextContract) {
    const logged = await auth.user

    if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });
    const grade = await Lesson.findOrFail(params.id)

    try {

      grade.active = !grade.active
      await grade.save()
      return response.ok({ message: 'Se cambio el estado correctamente' })

    } catch (error) {

      console.error(error)
      return response.badRequest({ error: error })

    }
  }
}
