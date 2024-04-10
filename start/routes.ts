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
import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home')
router.get('users', [UsersController, 'index'])

router.group(() => {
  router.on('/todos').render('pages/todos')
})

router.group(() => {
  router.post('login/authenticate', [SessionController, 'authenticate'])
  router.post('logout', [SessionController, 'logout'])
  router.post('signup', [SessionController, 'signup'])

  router.on('/login').render('pages/login/login')
  router.on('/signup').render('pages/login/signup')
})
