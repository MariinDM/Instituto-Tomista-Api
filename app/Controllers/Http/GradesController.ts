import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Grade from 'App/Models/Grade'
import GradeValidator from 'App/Validators/GradeValidator'

export default class GradesController {
  public async index({ response }: HttpContextContract) {
    const grade = await Grade.all()

    // console.log(roles.find(n => n.id == 4))

    return response.ok({ message: 'Ok', grade: grade })
  }

  public async store({ request, response }: HttpContextContract) {
    try {

      var vali = await request.validate(GradeValidator)
      await Grade.create(vali)
      return response.ok({ message: 'Se creo el Grado correctamente' })

    } catch (error) {
      console.log(error)

      return response.badRequest({ error: error.messages })

    }

  }

  public async show({ params, response }: HttpContextContract) {
    try {

      const grade = await Grade.query().where('id', params.id).orderBy('id', 'desc')
      return response.ok({ message: 'Ok', grade })

    } catch (error) {

      return response.ok({ error })

    }
  }

  public async update({ params, response, request }: HttpContextContract) {
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

  public async destroy({ params, response }: HttpContextContract) {
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
