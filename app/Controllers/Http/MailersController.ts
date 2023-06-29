import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route';
import Mail from "@ioc:Adonis/Addons/Mail"
import User from 'App/Models/User';
// import Env from '@ioc:Adonis/Core/Env'

export default class MailersController {
    public async sendMail(email: string, password: string) {
        await Mail.send((message) => {
            message
                .to(email)
                .subject('¡Bienvenido al Instituto Tomista!')
                .text(`Ya puedes ingresar a tu cuenta, esta es tu contraseña: ${password} \n Se recomienda que una vez inicie sesión se cambie`)
            // .from(email)
            // .htmlView('welcome', { name: 'John Doe' }) // vista de correo 'welcome' con datos adicionales
        })
    }
    public async sendSignedUrl(email: string, { auth, response }: HttpContextContract) {


        const user = await User.findBy('email', email)

        if (!user || !user.active) {
            return response.notFound({ message: 'Correo no encontrado' })
        }

        // Firmar url
        const signature = await auth.use('api').generate(user, {
            expiresIn: '1 hour'
        })

        const signedUrl = Route.makeSignedUrl('ruta.nombre', {}, { expiresIn: '1h' });

        // Envía el correo con la URL firmada
        await Mail.send((message) => {
            message
                .to(email)
                .subject('Ya puedes cambiar tu contraseña')
                .html(`Entra a este link: ${signedUrl}`);
        });

        // return response.ok({ message: 'Correo enviado con la ruta firmada' });
    }
}
