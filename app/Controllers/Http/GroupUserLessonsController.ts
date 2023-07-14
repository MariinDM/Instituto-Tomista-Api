import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Group from 'App/Models/Group';
import GroupUserLesson from 'App/Models/GroupUserLesson';
import Student from 'App/Models/Student';
import User from 'App/Models/User';

export default class GroupUserLessonsController {
  public async index({ response, auth }: HttpContextContract) {

    const logged = await auth.user

    if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });

    // const groupUserLessons = await GroupUserLesson.all()
    const groupUserLessons = await GroupUserLesson.query()
      .preload('user', query => {
        query.preload('profile')
      })
      .preload('group', query => {
        query.preload('students')
        query.preload('grade')
        query.preload('section')
      })
      .preload('lesson')
      .preload('education_level')

    return response.ok({ message: 'Ok', groupUserLessons })
  }

  public async store({ response, request, auth }: HttpContextContract) {
    const logged = await auth.user

    if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });

    try {
      var vali = await request.only(['students', 'group_id', 'lessons', 'education_level_id', 'user_id'])
    } catch (error) {
      console.log(error)
      return response.badRequest({ error: error })
    }

    const group = await Group.find(vali.group_id)

    if (!group) return response.notFound({ message: 'Grupo no encontrado' })

    const student = await Student.query()
      .whereIn('user_id', vali.students)
      .where('group_id', '!=', vali.group_id)

    if (student.length > 0) return response.badRequest({ message: 'Estudiante ya registrado en un grupo' })

    const users = await User.query()
      .whereIn('id', vali.students)
      .where('role_id', '!=', 3)

    if (users.length > 0) return response.badRequest({ message: 'Solo se permiten alumnos' })

    await Database.transaction(async (trx) => {

      for (const item of vali.students) {

        const stu = await Student.findBy('user_id', item)

        if (!stu) {
          const student = await Student.create({
            user_id: item,
            group_id: vali.group_id
          })
          await student.useTransaction(trx).save()
        }

      }

      for (const item of vali.lessons) {
        const groupUser = await GroupUserLesson.create({
          user_id: vali.user_id,
          education_level_id: vali.education_level_id,
          group_id: vali.group_id,
          lesson_id: item
        })
        await groupUser.useTransaction(trx).save()
      }

    })

    return response.ok({ message: "Ok" });
  }

  public async show({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ response, auth, params }: HttpContextContract) {

    const logged = await auth.user

    if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });

    const groupUserLesson = await GroupUserLesson.findOrFail(params.id)

    try {

      await groupUserLesson.delete()
      return response.ok({ message: 'Se elimino la asignación el Grupo' })

    } catch (error) {
      console.error(error)
      return response.badRequest({ error: error })
    }

  }
}
