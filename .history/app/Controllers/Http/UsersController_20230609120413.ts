import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MailController from './MailersController';
import Database from '@ioc:Adonis/Lucid/Database'
import Role from 'App/Models/Role'
import User from 'App/Models/User'
import UserProfile from 'App/Models/UserProfile'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'
import UserValidator from 'App/Validators/UserValidator'

export default class UsersController {

  public async index({ response }: HttpContextContract) {

    const users = await User.query()
      .orderBy('id', 'desc')
      .preload('role')
      .preload('profile')
    return response.ok({ message: 'Ok', users })

  }

  public async store({ response, request }: HttpContextContract) {

    try {
      var vali = await request.validate(UserValidator)
    } catch (error) {
      return response.badRequest({ error: error })
    }

    const role = await Role.find(vali.role_id)

    if (!role) return response.notFound({ message: 'Rol no encontrado' })

    await Database.transaction(async (trx) => {
      const user = new User();
      user.email = vali.email;
      user.password = vali.password;
      user.role_id = vali.role_id;

      await user.useTransaction(trx).save();

      const profile = new UserProfile();
      profile.user_id = user.id;
      profile.name = vali.name;
      profile.last_name = vali.last_name;
      profile.street = vali.street;
      profile.number = vali.number;
      profile.suburb = vali.suburb;
      profile.city = vali.city;
      profile.state = vali.state;
      profile.zip_code = vali.zip_code;
      profile.phone = vali.phone;

      await profile.useTransaction(trx).save();

      const mail = new MailController()
      await mail.sendMail(user.email)
    });

    // return response.ok({ message: 'Se ha creado un usuario correctamente' })
    // // return response.ok(JSON.stringify({ message: 'Se ha creado un usuario correctamente' }));
    // return response.json({ message: 'Se ha creado un usuario correctamente' });
    return response.status(200).json({ message: 'Se ha creado un usuario correctamente' });


  }

  public async show({ params, response }: HttpContextContract) {

    const user = await User.query()
      .where('id', params.id)
      .preload('role')
      .preload('profile')

    return response.ok({ message: 'Ok', user })

  }

  public async update({ params, response, request }: HttpContextContract) {


    try {
      const vali = await request.validate(UpdateUserValidator)

      await Database.transaction(async (trx) => {
        const user = await User.findOrFail(params.id)
        user.role_id = vali.role_id;

        await user.useTransaction(trx).save();

        const profile = await UserProfile.findByOrFail('user_id', user.id)
        profile.name = vali.name;
        profile.last_name = vali.last_name;
        profile.street = vali.street;
        profile.number = vali.number;
        profile.suburb = vali.suburb;
        profile.city = vali.city;
        profile.state = vali.state;
        profile.zip_code = vali.zip_code;
        profile.phone = vali.phone;

        await profile.useTransaction(trx).save();
      });

      return response.ok({ message: 'Se actualizo correctamente el usuario' })
    } catch (error) {
      console.error(error)

      return response.badRequest({ error: error })
    }

  }

  public async destroy({ params, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    try {

      user.active = !user.active
      await user.save()
      return response.ok({ message: 'Ok' })

    } catch (error) {

      console.error(error)
      return response.badRequest({ error: error })

    }
  }


  public async get_Quantity({ params, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    try {

      user.active = !user.active
      await user.save()
      return response.ok({ message: 'Ok' })

    } catch (error) {

      console.error(error)
      return response.badRequest({ error: error })

    }
  }
}
