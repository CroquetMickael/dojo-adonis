/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const UsersController = () => import('#controllers/users_controller')
const SessionController = () => import('#controllers/session_controller')
const TodosController = () => import('#controllers/todos_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('users', [UsersController, 'index'])

router
  .group(() => {
    router.post('todos', [TodosController, 'create'])
    router.get('/', [TodosController, 'index'])
    router.put('/todos/:id', [TodosController, 'update'])
    router.delete('/todos/:id', [TodosController, 'delete'])
  })
  .use(middleware.auth({ guards: ['web'] }))

router.group(() => {
  router.post('login/authenticate', [SessionController, 'authenticate'])
  router.get('logout', [SessionController, 'logout'])
  router.post('signup', [SessionController, 'signup'])

  router.on('/login').render('pages/login/login')
  router.on('/signup').render('pages/login/signup')
})
