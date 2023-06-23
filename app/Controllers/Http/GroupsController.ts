import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Grade from 'App/Models/Grade'
import Group from 'App/Models/Group'
import Secction from 'App/Models/Secction'

export default class GroupsController {
  public async index({ auth, response }: HttpContextContract) {

    const logged = await auth.user

    if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });

    const group = await Group.query()
      .preload('grade')
      .preload('section')
      .orderBy('id', 'desc')

    return response.ok({ message: 'Ok', group })
  }

  public async store({ auth, request, response }: HttpContextContract) {

    const logged = await auth.user

    if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });

    try {

      var vali = await request.only(['section_id', 'grade_id'])

    } catch (error) {
      console.log(error)
      return response.badRequest({ error: error })
    }

    // const data = request.body()

    const section = await Secction.find(vali.section_id)
    const grade = await Grade.find(vali.grade_id)

    if (!section || !grade) {
      return response.notFound({ message: 'No encontrado' })
    }

    const exist = await Group.query().where({
      section_id: section.id,
      grade_id: grade.id
    })

    if (exist.length > 0) {
      return response.badRequest({ message: 'Ya existe' })
    }

    await Group.create(vali)
    return response.ok({ message: 'Se creo el Grupo correctamente' })
  }

  public async show({ auth, params, response }: HttpContextContract) {

    const logged = await auth.user

    if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });

    try {

      const grade = await Group.query().where('id', params.id).orderBy('id', 'desc')
      return response.ok({ message: 'Ok', grade })

    } catch (error) {

      return response.ok({ error })

    }
  }

  public async update({ auth, params, response, request }: HttpContextContract) {

    const logged = await auth.user

    if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });

    const grade = await Group.findOrFail(params.id)

    try {
      const vali = await request.only(['section_id', 'grade_id'])

      grade.merge(vali)
      await grade.save()

      return response.ok({ message: 'Se ha actualizo el Grupo correctamente' })
    } catch (error) {

      console.error(error)
      return response.badRequest({ error: error })

    }
  }

  public async destroy({ auth, params, response }: HttpContextContract) {

    const logged = await auth.user

    if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });

    const group = await Group.findOrFail(params.id)

    try {

      group.active = !group.active
      await group.save()
      return response.ok({ message: 'Se desactivo el Grupo' })

    } catch (error) {
      console.error(error)
      return response.badRequest({ error: error })
    }
  }
}
