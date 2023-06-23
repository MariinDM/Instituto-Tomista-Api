import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import { DateTime } from 'luxon'
import UserProfile from 'App/Models/UserProfile'
import Drive from '@ioc:Adonis/Core/Drive'

export default class FileUploadsController {

    async uploadProfilePicture({ request, response, params }: HttpContextContract) {
        const { context } = await request.only(['context'])

        if (context === 'Profile') {


            const profilePic = request.file('profile_pic', {
                extnames: ['image', 'jpeg', 'png', 'jpg'],
                size: '2mb'
            })

            if (!profilePic) {
                return
            }

            if (!profilePic.isValid) {
                return profilePic.errors
            }

            const currentDate = DateTime.now().toFormat('yyyyMMddHHmmss');
            const extension = profilePic?.extname

            const fileName = `${currentDate}.${extension}`;

            await profilePic.move(Application.tmpPath('uploads'), {
                name: fileName,
                overwrite: true
            })

            var user = await UserProfile.findBy('user_id', params.id)
            if (user) {
                user.image = fileName;
                await user.save();
            }


            return response.ok({ message: 'Profile picture uploaded successfully' })
        }

    }

    async getProfilePicture({ response, params }: HttpContextContract) {

        const { filename } = params

        try {

            const exist = await Drive.exists(filename)

            if(!exist){
                return
            }

            const file = await Drive.getStream(filename)

            return response.stream(file)

        } catch (error) {

            console.log(error)

        }

    }
}