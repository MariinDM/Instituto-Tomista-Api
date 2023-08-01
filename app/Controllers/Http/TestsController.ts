import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Test from 'App/Models/Test';
import TestValidator from 'App/Validators/TestValidator';


export default class TestsController {
  public async index({ auth, response }: HttpContextContract) {
    const logged = await auth.user

    if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });


    const test = await Test.all()

    // console.log(roles.find(n => n.id == 4))

    return response.ok({ message: 'Ok', test })
  }

  public async store({ auth, response, request }: HttpContextContract) {
    const logged = await auth.user

    if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });


    try {
      var vali = await request.validate(TestValidator)
    } catch (error) {
      return response.badRequest({ error: error })
    }

    await Test.create(vali)

    return response.ok({ message: 'Se ha creado un Cuestionario correctamente' })
  }

  public async show({ params, response }: HttpContextContract) {
    // const logged = await auth.user

    // if (logged) return response.status(401).send({ message: "No autorizado" });

    const test = await Test.query()
      .where('id', params.id)
      .preload('questions', query1 => {
        query1.where('active', true)
      })
      .first()

    return response.ok({ message: 'Ok', test })
  }

  public async update({ auth, params, response, request }: HttpContextContract) {
    const logged = await auth.user

    if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });


    const question = await Test.findOrFail(params.id)

    try {
      const vali = await request.only(['name', 'description'])

      question.merge(vali)
      await question.save()

      return response.ok({ message: 'Se ha actualizado el Cuestionario correctamente' })
    } catch (error) {
      console.error(error)

      return response.badRequest({ error: error })
    }
  }

  public async destroy({ auth, response, params }: HttpContextContract) {
    const logged = await auth.user

    if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });
    const test = await Test.findOrFail(params.id)

    try {

      test.active = !test.active
      await test.save()
      return response.ok({ message: 'Se cambio el estado correctamente' })

    } catch (error) {

      console.error(error)
      return response.badRequest({ error: error })

    }
  }
}
