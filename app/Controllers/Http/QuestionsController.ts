import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Question from 'App/Models/Question';
import QuestionValidator from 'App/Validators/QuestionValidator';

export default class QuestionsController {
  public async index({auth, response}: HttpContextContract) {
    const logged = await auth.user

        if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });


        const question = await Question.all()

        // console.log(roles.find(n => n.id == 4))

        return response.ok({ message: 'Ok', question })
  }

  public async store({auth, response, request}: HttpContextContract) {
    const logged = await auth.user

        if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });


        try {
            var vali = await request.validate(QuestionValidator)
        } catch (error) {
            return response.badRequest({ error: error })
        }

        await Question.create(vali)

        return response.ok({ message: 'Se ha creado una Pregunta correctamente' })
  }

  public async show({auth, params, response}: HttpContextContract) {
    const logged = await auth.user

        if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });

        const question = await Question.query().where('id', params.id).orderBy('id', 'desc')

        return response.ok({ message: 'Ok', question })
  }

  public async update({auth, params, response, request}: HttpContextContract) {
    const logged = await auth.user

    if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });


    const question = await Question.findOrFail(params.id)

    try {
        const vali = await request.only(['name'])

        question.merge(vali)
        await question.save()

        return response.ok({ message: 'Se ha actualizado la Pregunta correctamente' })
    } catch (error) {
        console.error(error)

        return response.badRequest({ error: error })
    }
  }

  public async destroy({auth, params, response}: HttpContextContract) {
    const logged = await auth.user

        if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });


        const question = await Question.findOrFail(params.id)

        try {

            question.active = !question.active
            await question.save()
            return response.ok({ message: 'Se ha desactivado' })

        } catch (error) {

            console.error(error)
            return response.badRequest({ error: error })

        }
  }
}
