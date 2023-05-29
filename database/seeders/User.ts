import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await Role.createMany([
      {
        name: 'Administrador',
        description: ''
      },
      {
        name: 'Docente',
        description: ''
      },
      {
        name: 'Alumno',
        description: ''
      },
    ])


    await User.createMany([
      {
        email: 'admin@gmail.com',
        password: '1234567890',
        role_id: 1,   
      },
      {
        email: 'docente@gmail.com',
        password: '1234567890',
        role_id: 1,   
      },
      {
        email: 'alumno1@gmail.com',
        password: '1234567890',
        role_id: 1,   
      },
      {
        email: 'alumno2@gmail.com',
        password: '1234567890',
        role_id: 1,   
      },
    ])
  }
}
