import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Group from 'App/Models/Group';
import GroupUserLesson from 'App/Models/GroupUserLesson';
// import Lesson from 'App/Models/Lesson';

export default class GroupUserLessonsController {
  public async index({ response, auth }: HttpContextContract) {

    const logged = await auth.user

    if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });

    const groupUserLessons = await GroupUserLesson.query()
      .preload('user')
      .preload('group')
      .preload('lesson')
      .orderBy('id', 'desc')

    return response.ok({ message: 'Ok', groupUserLessons })
  }

  public async store({ response, request, auth }: HttpContextContract) {
    const logged = await auth.user

    if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });

    try {

      var vali = await request.only(['users', 'group_id', 'lessons'])

    } catch (error) {
      console.log(error)
      return response.badRequest({ error: error })
    }

    const group = await Group.find(vali.group_id)

    if (!group) return response.notFound({ message: 'Grupo no encontrado' })

    await Database.transaction(async (trx) => {

      await GroupUserLesson.query().where('group_id', vali.group_id).delete();

      for (const user of vali.users) {

        for (const lesson of vali.lessons) {

          const gul = new GroupUserLesson();
          gul.group_id = vali.group_id;
          gul.user_id = Number(user);
          gul.lesson_id = Number(lesson);

          await gul.useTransaction(trx).save();
        }
      }

    })

    return response.ok({ message: "Ok" });
  }

  public async show({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
