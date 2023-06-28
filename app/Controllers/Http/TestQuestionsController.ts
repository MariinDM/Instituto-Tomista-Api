import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Test from 'App/Models/Test';
// import TestQuestion from 'App/Models/TestQuestion';

export default class TestQuestionsController {
    public async index({ response, auth }: HttpContextContract) {
        const logged = await auth.user

        if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });

        if (logged) {
            var testquestion = await Test.query()
                .where('active', true)
                .orderBy("id", "desc")
                .preload("test_questions", query => {
                    query.preload("questions", qt => {
                        qt.where('active', true)
                    })
                })

            testquestion.forEach((element: any) => {
                element.test_questions = element.test_questions.filter(value => value.questions)
            });
            
            // testquestion = testquestion.filter(item => item.test_questions.length > 0)

            return response.ok({ message: "Ok", testquestion });
        } else {
            return response.notFound({ error: "No se encontró el usuario autenticado" });
        }
    }

    public async store({ response, request, auth }: HttpContextContract) {
        const logged = await auth.user

        if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });

        try {
            var vali = await request.only(['test_id', 'questions']);

            const test = await Test.find(vali.test_id)

            if (!test) return response.status(404).send({ message: "Pregunta no encontrada" });

            await test.related('questions').sync(vali.questions)

            return response.ok({ message: "Ok" });

        } catch (error) {
            console.log(error)
            return response.badRequest({ error: error });
        }
    }

    public async show({ }: HttpContextContract) { }

    public async destroy({ }: HttpContextContract) { }
}
