import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import View from 'App/Models/View'
import ViewValidator from 'App/Validators/ViewValidator';

export default class ViewsController {
  public async index({ response, auth }: HttpContextContract) {

    const logged = await auth.user

    if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });

    const view = await View.query()
      .where('active', true)
      .orderBy('id', 'desc')

    return response.ok({ message: "Ok", view });

  }

  public async store({ request, response, auth }: HttpContextContract) {
    const logged = await auth.user

    if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });

    try {

      const vali = await request.validate(ViewValidator)
      await View.create(vali)
      return response.ok({ message: 'Se creo la vista correctamente' })

    } catch (error) {

      console.log(error)
      return response.badRequest({ error: error.messages })

    }

  }

  public async show({ auth, params, response }: HttpContextContract) {
    const logged = await auth.user

    if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });
    try {

      const view = await View.query().where('id', params.id).orderBy('id', 'desc')
      return response.ok({ message: 'Ok', view })

    } catch (error) {

      return response.ok({ error })

    }
  }

  public async update({ auth, params, response, request }: HttpContextContract) {
    const logged = await auth.user

    if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });
    const view = await View.findOrFail(params.id)

    try {
      const vali = await request.only(['name', 'route', 'icon'])

      view.merge(vali)
      await view.save()

      return response.ok({ message: 'Se actualizo la vista' })
    } catch (error) {

      console.error(error)
      return response.badRequest({ error: error })

    }
  }

  public async destroy({ auth, params, response }: HttpContextContract) {
    const logged = await auth.user

    if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });
    const view = await View.findOrFail(params.id)

    try {

      view.active = !view.active
      await view.save()
      return response.ok({ message: 'Se cambio el estado correctamente' })

    } catch (error) {

      console.error(error)
      return response.badRequest({ error: error })

    }
  }

}
