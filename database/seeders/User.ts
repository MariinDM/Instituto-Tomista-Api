import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import EducationLevel from 'App/Models/EducationLevel'
import Grade from 'App/Models/Grade'
import Group from 'App/Models/Group'
import Role from 'App/Models/Role'
import RoleView from 'App/Models/RoleView'
import Secction from 'App/Models/Secction'
import User from 'App/Models/User'
import UserProfile from 'App/Models/UserProfile'
import View from 'App/Models/View'

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

    await View.createMany([
      {
        name: 'Dashboard',
        route: '/dashboard',
        icon: 'category'
      },
      {
        name: 'Usuarios',
        route: '/users',
        icon: 'person'
      },
      {
        name: 'Roles',
        route: '/roles',
        icon: 'badge'
      },
      {
        name: 'Grados',
        route: '/grades',
        icon: 'grade'
      },
      {
        name: 'Secciones',
        route: '/sections',
        icon: 'filter_list'
      },
      {
        name: 'Grupos',
        route: '/groups',
        icon: 'group'
      }
    ])

    await RoleView.createMany([
      { role_id: 1, view_id: 1 },
      { role_id: 1, view_id: 2 },
      { role_id: 1, view_id: 3 },
      { role_id: 1, view_id: 4 },
      { role_id: 1, view_id: 5 },
      { role_id: 1, view_id: 6 },
      { role_id: 2, view_id: 1 },
      { role_id: 2, view_id: 2 },
      { role_id: 3, view_id: 1 },
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
        role_id: 2
      }
    ])

    await UserProfile.createMany([
      {
        name: 'Luis Alfredo',
        last_name: 'Sanchez',
        street: 'Ejemplo',
        number: '1000',
        suburb: 'Col. Ejemplo',
        city: 'Torreón',
        state: 'Coahuila',
        zip_code: '27777',
        phone: '8714879687',
        user_id: 1,
        image: 'perfil.png',
        birthday: '00-00-00'
      },
      {
        name: 'Paola',
        last_name: 'Gomez Macias',
        street: 'Ejemplo',
        number: '1000',
        suburb: 'Col. Ejemplo',
        city: 'Torreón',
        state: 'Coahuila',
        zip_code: '27777',
        phone: '8714879687',
        user_id: 2,
        image: 'logog.png',
        birthday: '00-00-00'
      },
      {
        name: 'Aneth ',
        last_name: 'Elvira Castañeda',
        street: 'Ejemplo',
        number: '1000',
        suburb: 'Col. Ejemplo',
        city: 'Torreón',
        state: 'Coahuila',
        zip_code: '27777',
        phone: '8714879687',
        user_id: 3,
        image: 'logog.png',
        birthday: '00-00-00'
      },
      {
        name: 'Edgar Alejandro Segovia',
        last_name: 'Guzman',
        street: 'Ejemplo',
        number: '1000',
        suburb: 'Col. Ejemplo',
        city: 'Torreón',
        state: 'Coahuila',
        zip_code: '27777',
        phone: '8714879687',
        user_id: 4,
        image: 'logog.png',
        birthday: '00-00-00'
      },
      {
        name: 'Diego',
        last_name: 'Marin Montalvo',
        street: 'Ejemplo',
        number: '1000',
        suburb: 'Col. Ejemplo',
        city: 'Torreón',
        state: 'Coahuila',
        zip_code: '27777',
        phone: '8714879687',
        user_id: 5,
        image: 'logog.png',
        birthday: '00-00-00'
      },
    ])

    await Grade.createMany([
      { name: '1' },
      { name: '2' },
      { name: '3' },
      { name: '4' },
      { name: '5' },
      { name: '6' },
      { name: '7' },
      { name: '8' }
    ])

    await Secction.createMany([
      { name: 'A' },
      { name: 'B' },
      { name: 'C' },
      { name: 'D' },
      { name: 'E' },
      { name: 'F' },
      { name: 'G' },
      { name: 'H' },
      { name: 'I' },
      { name: 'J' },
    ])

    await Group.createMany([
      { section_id: 1, grade_id: 1 },
      { section_id: 2, grade_id: 1 },
      { section_id: 3, grade_id: 1 },
      { section_id: 1, grade_id: 2 },
      { section_id: 2, grade_id: 2 },
      { section_id: 3, grade_id: 2 },
      { section_id: 1, grade_id: 3 },
      { section_id: 2, grade_id: 3 },
      { section_id: 3, grade_id: 3 },
      { section_id: 1, grade_id: 4 },
      { section_id: 2, grade_id: 4 },
      { section_id: 3, grade_id: 4 },
      { section_id: 1, grade_id: 5 },
      { section_id: 2, grade_id: 5 },
      { section_id: 3, grade_id: 5 },
      { section_id: 1, grade_id: 6 },
      { section_id: 2, grade_id: 6 },
      { section_id: 3, grade_id: 6 },
      { section_id: 1, grade_id: 7 },
      { section_id: 2, grade_id: 7 },
      { section_id: 3, grade_id: 7 },
    ])

    await EducationLevel.createMany([
      {
        name: 'Primaria',
        description: ''
      },
      {
        name: 'Secundaria',
        description: ''
      },
      {
        name: 'Bachillerato',
        description: ''
      },
    ])
  }
}
