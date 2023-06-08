import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import MailController from './MailersController';
import User from 'App/Models/User'
import Mail from '@ioc:Adonis/Addons/Mail';

export default class ForgotPasswordsController {
    public async sendRouteSigned({ response, request, auth }: HttpContextContract) {

        const { email } = request.only(['email']);

        try {
            const user = await User.findBy('email', email);

            if (!user) {
                return response.notFound({ message: 'Correo no encontrado' });
            }

            const signature = await auth.use('api').generate(user, {
                expiresIn: '1 hour'
            })

            await Mail.send((message) => {
                message
                    .to(email)
                    .subject('Olvidaste tu Contrseña')
                    .text(`Entra a este link para retablecer contraseña: http://localhost:4200/#/authentication/reset-password/${signature.token}`)
                // .from(email)
                // .htmlView('welcome', { name: 'John Doe' }) // vista de correo 'welcome' con datos adicionales
            })

            return response.ok({ message: 'Revisa tu correo' });
        } catch (error) {
            console.error(error);

            return response.internalServerError({
                message: 'Error al enviar la ruta firmada por correo',
            });
        }

    }
}
