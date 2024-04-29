// import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import { signupValidator } from '#validators/login'

export default class SessionController {
  async authenticate({ request, auth, response }: HttpContext) {
    /**
     * Step 1: Get credentials from the request body
     */
    const { email, password } = request.only(['email', 'password'])

    /**
     * Step 2: Verify credentials
     */
    const user = await User.verifyCredentials(email, password)

    /**
     * Step 3: Login user
     */
    await auth.use('web').login(user)
    response.redirect('/')
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()

    response.redirect('/login')
  }

  async signup({ request, response }: HttpContext) {
    const payload = await request.validateUsing(signupValidator)
    try {
      await User.create(payload)
    } catch (error) {
      throw error
    }
    response.redirect('/login')
  }
}
