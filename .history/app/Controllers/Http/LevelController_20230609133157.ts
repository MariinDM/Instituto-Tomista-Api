import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Secction from 'App/Models/Secction'
import SectionValidator from 'App/Validators/SectionValidator'

export default class LevelController {
  public async index({ response }: HttpContextContract) {
    const section = await Secction.all()

    // console.log(roles.find(n => n.id == 4))

    return response.ok({ message: 'Ok', section })
  }

  public async store({ request, response }: HttpContextContract) {
    try {

      const vali = await request.validate(SectionValidator)
      
      await Secction.create(vali)
      return response.ok({ message: 'Se ha creado una Seccion correctamente' })

    } catch (error) {

      return response.badRequest({ error: error.messages })

    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {

      const section = await Secction.query().where('id', params.id).orderBy('id', 'desc')
      return response.ok({ message: 'Ok', grade: section })

    } catch (error) {

      return response.ok({ error })

    }
  }

  public async update({ params, response, request }: HttpContextContract) {
    const section = await Secction.findOrFail(params.id)

    try {
      const vali = await request.only(['name'])

      section.merge(vali)
      await section.save()

      return response.ok({ message: 'Se ha actualizado una seccion correctamente' })
    } catch (error) {

      console.error(error)
      return response.badRequest({ error: error.message })

    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const section = await Secction.findOrFail(params.id)

    try {

      section.active = !section.active
      await section.save()
      return response.ok({ message: 'Se ha desactivado la Seccion' })

    } catch (error) {

      console.error(error)
      return response.badRequest({ error: error })

    }
  }
}
