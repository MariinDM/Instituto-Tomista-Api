import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Evaluation from 'App/Models/Evaluation';
import User from 'App/Models/User';

export default class EvaluationsController {
    async index({ response, auth }: HttpContextContract) {

        const logged = await auth.user

        if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });

        const evaluations = await Evaluation.query()
            .preload('group', query1 => {
                query1.preload('grade')
                query1.preload('section')
            })
            .preload('test')
            .preload('user')

        return response.ok({ message: 'Ok', evaluations: evaluations })
    }

    async store({ response, request, auth }: HttpContextContract) {
        const logged = await auth.user

        if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });

        try {

            const { user_id, group_id, test_id, date } = request.only(['user_id', 'group_id', 'test_id', 'date'])

            const user = await User.find(user_id)

            if (user?.role_id != 2) return response.badRequest({ message: 'El rol no es un Docente' })

            await Evaluation.create({ user_id, group_id, test_id, date });

            return response.ok({ message: 'Ok' })
        } catch (error) {

            console.error(error)
            return response.badRequest({ error: error })

        }
    }

    async update({ response, request, auth, params }: HttpContextContract) {
        const logged = await auth.user

        if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });

        try {

            const vali = request.only(['user_id', 'group_id', 'test_id', 'date'])

            var evaluation = await Evaluation.findOrFail(params.id)

            evaluation.merge(vali)
            await evaluation.save()

            return response.ok({ message: 'Ok' })
        } catch (error) {

            console.error(error)
            return response.badRequest({ error: error })

        }
    }

    public async destroy({ auth, params, response, request }: HttpContextContract) {

        const logged = await auth.user

        if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });

        const evaluation = await Evaluation.find(params.id)

        if (!evaluation) return response.badRequest({ message: "Evaluacion no encontrada" })

        try {

            // const { type } = params.type
            const { type } = request.body()

            if (type) {
                evaluation.active = !evaluation.active
                await evaluation.save()
                return response.ok({ message: 'Se cambio la evaluacion' })
            } else {
                evaluation.public = !evaluation.public
                await evaluation.save()
                return response.ok({ message: 'Se cambio la evaluacion' })
            }


        } catch (error) {
            console.error(error)
            return response.badRequest({ error: error })
        }
    }
}
