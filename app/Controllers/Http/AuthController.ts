import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {

  public async singIn({ response, request, auth }: HttpContextContract) {
    const { email, password } = request.all();

    try {
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '8 hours'
      })
      return token
    } catch {
      return response.unauthorized({ message: 'Invalid credentials' })
    }
  }
}
