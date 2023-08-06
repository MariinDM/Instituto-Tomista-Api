import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Answer from 'App/Models/Answer';
import Evaluation from 'App/Models/Evaluation';
import Student from 'App/Models/Student';

export default class AnswersController {
  public async index({ auth, response }: HttpContextContract) {

    try {
      const user = await auth.user;
      if (!user || user.role_id !== 2) return response.status(401).send({ message: "No autorizado" });

      const evaluations = await Evaluation.query()
        .where('user_id', user.id)
        .where('active ', true)
        .preload('test')
        .preload('answers', builder => {
          builder.preload('quetion')
        })
        .orderBy('id','desc')

      return response.ok({ message: 'Ok', evaluations })

    } catch (error) {
      console.log(error);
      return response.status(400).send({ error: error.message });
    }


  }

  public async create({ }: HttpContextContract) { }

  public async store({ auth, response, request }: HttpContextContract) {
    try {
      const user = await auth.user;
      if (!user) return response.status(401).send({ message: "No autorizado" });

      const student = await Student.findBy('user_id', user.id)
      if (!student) return response.status(401).send({ message: "No autorizado" });

      const { evaluation_id, answers } = request.only(['evaluation_id', 'answers']);

      for (const element of answers) {
        await Answer.create({ evaluation_id, student_id: student.id, question_id: element?.question_id, score: element?.score });
      }

      return response.status(200).send({ message: "Respuestas creadas exitosamente" });
    } catch (error) {
      console.log(error);
      return response.badRequest({ error: error.message });
    }

  }

  public async show({ }: HttpContextContract) { }

  public async edit({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
