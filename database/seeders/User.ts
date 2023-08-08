import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import EducationLevel from 'App/Models/EducationLevel'
import Grade from 'App/Models/Grade'
import Group from 'App/Models/Group'
import Lesson from 'App/Models/Lesson'
import Question from 'App/Models/Question'
import Role from 'App/Models/Role'
import RoleView from 'App/Models/RoleView'
import Secction from 'App/Models/Secction'
import Test from 'App/Models/Test'
import TestQuestion from 'App/Models/TestQuestion'
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
      },
      {
        name: 'Niveles Educativos',
        route: '/education-levels',
        icon: 'school'
      },
      {
        name: 'Materias',
        route: '/lessons',
        icon: 'group'
      },
      {
        name: 'Asignar Materias',
        route: '/user-lessons',
        icon: 'group'
      },
      {
        name: 'Preguntas',
        route: '/questions',
        icon: 'question_mark'
      },
      {
        name: 'Encuestas',
        route: '/tests',
        icon: 'quiz'
      },
      {
        name: 'Encuestas y Preguntas',
        route: '/tests-questions',
        icon: 'checklist'
      },
      {
        name: 'Evaluaciones',
        route: '/evaluations',
        icon: 'local_library'
      }

    ])

    await RoleView.createMany([
      { role_id: 1, view_id: 1 },
      { role_id: 1, view_id: 2 },
      { role_id: 1, view_id: 3 },
      { role_id: 1, view_id: 4 },
      { role_id: 1, view_id: 5 },
      { role_id: 1, view_id: 6 },
      { role_id: 1, view_id: 7 },
      { role_id: 1, view_id: 8 },
      { role_id: 1, view_id: 9 },
      { role_id: 1, view_id: 10 },
      { role_id: 1, view_id: 11 },
      { role_id: 1, view_id: 12 },
      { role_id: 1, view_id: 13 },
      { role_id: 2, view_id: 1 },
      { role_id: 3, view_id: 1 },
    ])

    await User.createMany([
      {
        email: 'admin@gmail.com',
        password: '1234567890',
        role_id: 1,
      },
      {
        email: 'docente1@gmail.com',
        password: '1234567890',
        role_id: 2,
      },
      {
        email: 'docente2@gmail.com',
        password: '1234567890',
        role_id: 2
      },
      {
        email: 'docente3@gmail.com',
        password: '1234567890',
        role_id: 2,
      },
      {
        email: 'alumno1@gmail.com',
        password: '1234567890',
        role_id: 3
      },
      {
        email: 'alumno2@gmail.com',
        password: '1234567890',
        role_id: 3
      },
      {
        email: 'alumno3@gmail.com',
        password: '1234567890',
        role_id: 3,
      },
      {
        email: 'alumno4@gmail.com',
        password: '1234567890',
        role_id: 3
      },
      {
        email: 'alumno5@gmail.com',
        password: '1234567890',
        role_id: 3
      },
      {
        email: 'alumno6@gmail.com',
        password: '1234567890',
        role_id: 3
      },
      {
        email: 'alumno7@gmail.com',
        password: '1234567890',
        role_id: 3
      },
      {
        email: 'alumno8@gmail.com',
        password: '1234567890',
        role_id: 3
      },
      {
        email: 'alumno9@gmail.com',
        password: '1234567890',
        role_id: 3
      },
      {
        email: 'alumno10@gmail.com',
        password: '1234567890',
        role_id: 3
      },
      {
        email: 'alumno11@gmail.com',
        password: '1234567890',
        role_id: 3
      },
      {
        email: 'alumno12@gmail.com',
        password: '1234567890',
        role_id: 3
      },

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
        image: 'docente.png',
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
        image: 'docente.png',
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
        image: 'docente.png',
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
        image: 'alumno.png',
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
        image: 'alumno.png',
        birthday: '00-00-00'
      },
      {
        name: 'Javier',
        last_name: 'Correa Aguirre',
        street: 'Ejemplo',
        number: '1000',
        suburb: 'Col. Ejemplo',
        city: 'Torreón',
        state: 'Coahuila',
        zip_code: '27777',
        phone: '8714879687',
        user_id: 6,
        image: 'alumno.png',
        birthday: '00-00-00'
      },
      {
        name: 'Luisa',
        last_name: 'Cordova Martinez',
        street: 'Ejemplo',
        number: '1000',
        suburb: 'Col. Ejemplo',
        city: 'Torreón',
        state: 'Coahuila',
        zip_code: '27777',
        phone: '8714879687',
        user_id: 7,
        image: 'alumno.png',
        birthday: '00-00-00'
      },
      {
        name: 'Angel Miguel',
        last_name: 'Amenaza Lopez',
        street: 'Ejemplo',
        number: '1000',
        suburb: 'Col. Ejemplo',
        city: 'Torreón',
        state: 'Coahuila',
        zip_code: '27777',
        phone: '8714879643',
        user_id: 8,
        image: 'alumno.png',
        birthday: '00-00-00'
      },
      {
        name: 'Angel Miguel',
        last_name: 'Amenaza Lopez',
        street: 'Ejemplo',
        number: '1000',
        suburb: 'Col. Ejemplo',
        city: 'Torreón',
        state: 'Coahuila',
        zip_code: '27777',
        phone: '8714879643',
        user_id: 9,
        image: 'alumno.png',
        birthday: '00-00-00'
      },
      {
        name: 'Alejandro Jose',
        last_name: 'Magallanes Pineda',
        street: 'Ejemplo',
        number: '1000',
        suburb: 'Col. Ejemplo',
        city: 'Torreón',
        state: 'Coahuila',
        zip_code: '27777',
        phone: '8714879643',
        user_id: 10,
        image: 'alumno.png',
        birthday: '00-00-00'
      },
      {
        name: 'Donal',
        last_name: 'Trump USA',
        street: 'Ejemplo',
        number: '1000',
        suburb: 'Col. Ejemplo',
        city: 'Torreón',
        state: 'Coahuila',
        zip_code: '27777',
        phone: '8714879643',
        user_id: 11,
        image: 'alumno.png',
        birthday: '00-00-00'
      },
      {
        name: 'Victor',
        last_name: 'Basurto',
        street: 'Ejemplo',
        number: '1000',
        suburb: 'Col. Ejemplo',
        city: 'Torreón',
        state: 'Coahuila',
        zip_code: '27777',
        phone: '8714879643',
        user_id: 12,
        image: 'alumno.png',
        birthday: '00-00-00'
      },
      {
        name: 'Ramiro ',
        last_name: 'Alcala',
        street: 'Ejemplo',
        number: '1000',
        suburb: 'Col. Ejemplo',
        city: 'Torreón',
        state: 'Coahuila',
        zip_code: '27777',
        phone: '8714879643',
        user_id: 13,
        image: 'alumno.png',
        birthday: '00-00-00'
      },
      {
        name: 'Lionel Andres',
        last_name: 'Messi',
        street: 'Ejemplo',
        number: '1000',
        suburb: 'Col. Ejemplo',
        city: 'Torreón',
        state: 'Coahuila',
        zip_code: '27777',
        phone: '8714879643',
        user_id: 14,
        image: 'alumno.png',
        birthday: '00-00-00'
      },
      {
        name: 'Romelu',
        last_name: 'Lukaku Sanchez',
        street: 'Ejemplo',
        number: '1000',
        suburb: 'Col. Ejemplo',
        city: 'Torreón',
        state: 'Coahuila',
        zip_code: '27777',
        phone: '8714879643',
        user_id: 15,
        image: 'alumno.png',
        birthday: '00-00-00'
      },
      {
        name: 'Abel',
        last_name: 'Gutierres Lopez',
        street: 'Ejemplo',
        number: '1000',
        suburb: 'Col. Ejemplo',
        city: 'Torreón',
        state: 'Coahuila',
        zip_code: '27777',
        phone: '8714879643',
        user_id: 16,
        image: 'alumno.png',
        birthday: '00-00-00'
      },
    ])

    await Grade.createMany([
      { name: '1' },
      { name: '2' },
      { name: '3' }
    ])

    await Secction.createMany([
      { name: 'A' },
      { name: 'B' },
      { name: 'C' },
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
      { section_id: 3, grade_id: 3 }
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

    await Lesson.createMany([
      { name: 'Biologia', description: '' },
      { name: 'Fisica', description: '' },
      { name: 'Educacion Fisica', description: '' },
      { name: 'Geografia', description: '' },
      { name: 'Español V', description: '' },
      { name: 'Matematicas I', description: '' },
      { name: 'Derivadas', description: '' },
    ])

    await Question.createMany([
      { name: 'El profesor llego a tiempo a la clase' },
      { name: 'Explico los temas de manera clara' },
      { name: 'Resolvio tus dudas' },
      { name: 'Dio una retroalimentacion del tema' },
      { name: 'Explico las aplicaciones de la teoria' },
      { name: 'Al inicio del curso te dio la rubrica del curso' },
      { name: 'Dio calificaciones a tiempo' },
      { name: 'Dio a los alumnos el conocimiento necesario para el examen' },
    ])

    await Test.createMany([
      { name: 'Evaluacion Docente', description: '' }
    ])

    await TestQuestion.createMany([
      { test_id: 1, question_id: 1 },
      { test_id: 1, question_id: 2 },
      { test_id: 1, question_id: 3 },
      { test_id: 1, question_id: 4 },
      { test_id: 1, question_id: 5 },
      { test_id: 1, question_id: 6 },
      { test_id: 1, question_id: 7 },
      { test_id: 1, question_id: 8 }
    ])
  }
}
