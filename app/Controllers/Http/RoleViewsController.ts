import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role';

import RoleView from "App/Models/RoleView";

export default class RoleViewsController {
    public async index({ response, auth }: HttpContextContract) {
        const logged = await auth.user

        if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });

        if (logged) {
            const roleViews = await RoleView.query()
                .orderBy("id", "desc")
                .preload("views")
                .preload("roles")

            return response.ok({ message: "Ok", roleViews });
        } else {
            return response.notFound({ error: "No se encontró el usuario autenticado" });
        }
    }

    public async store({ response, request, auth }: HttpContextContract) {
        const logged = await auth.user

        if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });

        try {
            var vali = await request.only(['role_id', 'views']);

            const role = await Role.find(vali.role_id)

            if (!role) return response.status(404).send({ message: "Rol no encontrado" });

            await role.related('views').sync(vali.views)

            return response.ok({ message: "Ok" });

        } catch (error) {
            console.log(error)
            return response.badRequest({ error: error });
        }
    }

}
