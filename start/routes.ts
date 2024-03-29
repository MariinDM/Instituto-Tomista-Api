/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.resource('views', 'ViewsController.ts')
  Route.resource('roles', 'RolesController.ts')
  Route.resource('roleViews', 'RoleViewsController.ts')
  Route.resource('users', 'UsersController.ts')
  Route.resource('grades', 'GradesController.ts')
  Route.resource('sections', 'SectionsController.ts')
  Route.resource('groups', 'GroupsController.ts')
  Route.resource('groupUserLessons', 'GroupUserLessonsController.ts')
  Route.resource('education/levels', 'EducationLevelsController.ts')
  Route.resource('lessons', 'LessonsController.ts')
  Route.resource('questions', 'QuestionsController.ts')
  Route.resource('tests', 'TestsController.ts')
  Route.resource('evaluations', 'EvaluationsController.ts')
  Route.resource('testQuestions', 'TestQuestionsController.ts')
  Route.resource('answers', 'AnswersController.ts')

  Route.get('show/evaluations','EvaluationsController.showEvaluations')
  // Route.post('show/test/questions/:id','EvaluationsController.showTestQuetions')

  Route.get('me', 'AuthController.getUserProfile')
  Route.post('logout', 'AuthController.logout')
  
  Route.post('upload/:id', 'FileUploadsController.uploadProfilePicture')
  Route.post('filter/lessons', 'EducationLevelsController.filterLessons')
  
})
.middleware('auth')
.prefix('api/v1')


Route.group(() => {
  
  Route.post('login', 'AuthController.singIn')
  Route.post('send/route/signed', 'ForgotPasswordsController.sendRouteSigned')
  Route.post('reset-password', 'ForgotPasswordsController.resetPassword')
  Route.get('get/profile/picture/:filename', 'FileUploadsController.getProfilePicture')
  
}).prefix('api/v1')
