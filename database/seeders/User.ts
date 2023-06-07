import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'
import User from 'App/Models/User'
import UserProfile from 'App/Models/UserProfile'

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
        role_id: 2,
      },
      {
        email: 'alumno1@gmail.com',
        password: '1234567890',
        role_id: 3,
      },
      {
        email: 'alumno2@gmail.com',
        password: '1234567890',
        role_id: 3
      },
      {
        email: 'diego@gmail.com',
        password: '1234567890',
        role_id: 1
      }
    ])

    await UserProfile.createMany([
      {
        name: 'dddd',
        last_name: 'dddd',
        street: 'Ejemplo',
        number: '1000',
        suburb: 'Col. Ejemplo',
        city: 'Torreón',
        state: 'Coahuila',
        zip_code: '27777',
        phone: '8714879687',
        user_id: 1
      },
      {
        name: 'ddd',
        last_name: 'aaaa',
        street: 'Ejemplo',
        number: '1000',
        suburb: 'Col. Ejemplo',
        city: 'Torreón',
        state: 'Coahuila',
        zip_code: '27777',
        phone: '8714879687',
        user_id: 2
      },
      {
        name: 'dddd',
        last_name: 'dddd',
        street: 'Ejemplo',
        number: '1000',
        suburb: 'Col. Ejemplo',
        city: 'Torreón',
        state: 'Coahuila',
        zip_code: '27777',
        phone: '8714879687',
        user_id: 3
      },
      {
        name: 'ddddddaaaa',
        last_name: 'aaaaa',
        street: 'Ejemplo',
        number: '1000',
        suburb: 'Col. Ejemplo',
        city: 'Torreón',
        state: 'Coahuila',
        zip_code: '27777',
        phone: '8714879687',
        user_id: 4
      },
      {
        name: 'Diego',
        last_name: 'Marin',
        street: 'Ejemplo',
        number: '1000',
        suburb: 'Col. Ejemplo',
        city: 'Torreón',
        state: 'Coahuila',
        zip_code: '27777',
        phone: '8714879687',
        user_id: 5
      },
    ])
  }
}
