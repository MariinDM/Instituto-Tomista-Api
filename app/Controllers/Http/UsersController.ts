import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import MailController from "./MailersController";
import Database from "@ioc:Adonis/Lucid/Database";
import Role from "App/Models/Role";
import User from "App/Models/User";
import UserProfile from "App/Models/UserProfile";
import UpdateUserValidator from "App/Validators/UpdateUserValidator";
import UserValidator from "App/Validators/UserValidator";

export default class UsersController {
  public async index({ response, auth }: HttpContextContract) {

    const logged = await auth.user

    if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });

    if (logged) {
      const users = await User.query()
        .orderBy("id", "desc")
        .where('role_id', '>', logged.role_id)
        .preload("role")
        .preload("profile")

      return response.ok({ message: "Ok", users });
    } else {
      return response.notFound({ error: "No se encontró el usuario autenticado" });
    }

  }

  public async store({ response, request, auth }: HttpContextContract) {
    try {
      var vali = await request.validate(UserValidator);
    } catch (error) {
      return response.badRequest({ error: error });
    }

    const logged = await auth.user

    if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });

    const role = await Role.find(vali.role_id);

    if (!role) return response.notFound({ message: "Rol no encontrado" });

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

      const mail = new MailController();
      await mail.sendMail(user.email);
    });

    return response.ok({ message: 'Se ha creado un usuario correctamente' })
  }

  public async show({ params, response }: HttpContextContract) {
    const user = await User.query()
      .where("id", params.id)
      .preload("role")
      .preload("profile");

    return response.ok({ message: "Ok", user });
  }

  public async update({ params, response, request, auth }: HttpContextContract) {
    try {
      const vali = await request.validate(UpdateUserValidator);

      const logged = await auth.user

      if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });

      await Database.transaction(async (trx) => {
        const user = await User.findOrFail(params.id);
        user.role_id = vali.role_id;

        await user.useTransaction(trx).save();

        const profile = await UserProfile.findByOrFail("user_id", user.id);
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

      return response.ok({ message: "Se actualizo correctamente el usuario" });
    } catch (error) {
      console.error(error);

      return response.badRequest({ error: error });
    }
  }

  public async destroy({ params, response, auth }: HttpContextContract) {
    
    const user = await User.findOrFail(params.id);

    const logged = await auth.user

    if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });

    try {
      user.active = !user.active;
      await user.save();
      return response.ok({ message: "Estado cambiado correctamente" });
    } catch (error) {
      console.error(error);
      return response.badRequest({ error: error });
    }
  }

}
