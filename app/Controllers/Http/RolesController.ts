import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'
import RoleValidator from 'App/Validators/RoleValidator'

export default class RolesController {

    public async index({ auth, response }: HttpContextContract) {

        const logged = await auth.user

        if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });


        const roles = await Role.all()

        // console.log(roles.find(n => n.id == 4))

        return response.ok({ message: 'Ok', roles })
    }

    public async show({ auth, params, response }: HttpContextContract) {

        const logged = await auth.user

        if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });

        const role = await Role.query().where('id', params.id).orderBy('id', 'desc')

        return response.ok({ message: 'Ok', role })
    }

    public async store({ auth, response, request }: HttpContextContract) {

        const logged = await auth.user

        if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });


        try {
            var vali = await request.validate(RoleValidator)
        } catch (error) {
            return response.badRequest({ error: error })
        }

        await Role.create(vali)

        return response.ok({ message: 'Se ha creado un Rol correctamente' })

    }

    public async update({ auth, params, response, request }: HttpContextContract) {

        const logged = await auth.user

        if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });


        const role = await Role.findOrFail(params.id)

        try {
            const vali = await request.only(['name', 'description'])

            role.merge(vali)
            await role.save()

            return response.ok({ message: 'Se ha actualizado un Rol correctamente' })
        } catch (error) {
            console.error(error)

            return response.badRequest({ error: error })
        }


    }

    public async destroy({ auth, params, response }: HttpContextContract) {

        const logged = await auth.user

        if (logged && logged.role_id > 1) return response.status(401).send({ message: "No autorizado" });


        const role = await Role.findOrFail(params.id)

        try {

            role.active = !role.active
            await role.save()
            return response.ok({ message: 'Se ha desactivado un rol' })

        } catch (error) {

            console.error(error)
            return response.badRequest({ error: error })

        }

    }
}
