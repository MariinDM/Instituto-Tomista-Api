import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserProfile from 'App/Models/UserProfile'
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

    return {
      token: token.toJSON(),
      userId: user.id
    };
    } catch {
     // return response.unauthorized({ message: 'Invalid credentials' })
    }
  }

  public async logout({ auth, response }) {

    await auth.logout()
    return response.status(204).json({ message: 'Logged out successfully' })
    
  }


  public async getUserProfile({ params, response }) {
    try {
      const userProfile = await UserProfile.query()
        .where('user_id', params.id)
        .firstOrFail();

        const user = await User.query()
        .where('id', params.id)
        .firstOrFail();


        const { email, role_id } = user;
      const {id, name, last_name, street, number, suburb, city, state, zip_code, phone } = userProfile;
      
      return response.status(200).json({
       id,
        role_id,
        email,
        name,
        last_name,
        street,
        number,
        suburb,
        city,
        state,
        zip_code,
        phone,
      });
    } catch (error) {
      return response.notFound({ message: 'User profile not found' });
    }
  }
  
}


