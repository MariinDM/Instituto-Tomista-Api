import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'
import RoleValidator from 'App/Validators/RoleValidator'

export default class RolesController {
    
    public async index({ response }: HttpContextContract) {

        const roles = await Role.all()

        console.log(roles.find(n => n.id == 4))

        return response.ok({ message: 'Ok', roles })
    }

    public async show({ params, response }: HttpContextContract) {

        const role = await Role.query().where('id', params.id).orderBy('id', 'desc').exec()

        return response.ok({ message: 'Ok', role })
    }

    public async store({ response, request }: HttpContextContract) {

        try {
            var vali = await request.validate(RoleValidator)
        } catch (error) {
            return response.badRequest({ error: error.messages })
        }

        await Role.create(vali)

        return response.ok({ message: 'Ok' })

    }

    public async update({ params, response, request }: HttpContextContract) {

        const role = await Role.findOrFail(params.id)

        try {
            const vali = await request.only(['name', 'description'])

            role.merge(vali)
            await role.save()

            return response.ok({ message: 'Ok' })
        } catch (error) {
            console.error(error)

            return response.badRequest({ error: error.messages })
        }


    }

    public async destroy({ params, response }: HttpContextContract) {

        const role = await Role.findOrFail(params.id)

        try {

            role.active = !role.active
            await role.save()
            return response.ok({ message: 'Ok' })

        } catch (error) {

            console.error(error)
            return response.badRequest({ error: error.messages })

        }

    }
}
