import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {

  public async singIn({ response, request, auth }: HttpContextContract) {
    const { email, password } = request.all();

    try {
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '8 hours'
      })
      const user = await User.findBy('email', email);
      if (!user) {
        throw new Error('User not found');
      }

      return response.ok(token)
    } catch {
      // return response.unauthorized({ message: 'Invalid credentials' })
    }
  }

  public async logout({ auth, response }) {

    await auth.logout()
    return response.ok({ message: 'Sesión cerrada con exito' })

  }


  public async getUserProfile({ response, auth }) {
    try {

      const user = await auth.user

      if (user.role_id === 3) {
        const me = await User.query()
          .where('id', auth.use('api').user?.id)
          .where('email', auth.use('api').user?.email)
          .preload('role')
          .preload('student', query1 => {
            query1.preload('group', query2 => {
              query2.preload('grade')
              query2.preload('section')
              query2.preload('groupUserLessons', query3 => {
                query3.preload('lesson')
                query3.preload('education_level')
              })
            })
          })
          .preload('profile')
          .first()

        return response.ok({ message: 'Datos obtenidos con exito', me })
      } else if (user.role_id === 2) {
        const me = await User.query()
          .where('id', auth.use('api').user?.id)
          .where('email', auth.use('api').user?.email)
          .preload('role')
          .preload('groupUserLessons', query1 => {
            query1.preload('lesson')
            query1.preload('education_level')
            query1.preload('group', query2 => {
              query2.preload('grade')
              query2.preload('section')
            })
          })
          .preload('profile')
          .first()

        return response.ok({ message: 'Datos obtenidos con exito', me })
      } else {
        const me = await User.query()
          .where('id', auth.use('api').user?.id)
          .where('email', auth.use('api').user?.email)
          .preload('role')
          .preload('profile')
          .first()

        return response.ok({ message: 'Datos obtenidos con exito', me })
      }

    } catch (error) {
      console.log(error)
      return response.notFound({ message: 'Usuario no encontrado' });
    }
  }

}


