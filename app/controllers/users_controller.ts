import { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async index(ctx: HttpContext) {
    return [
      {
        id: 1,
        username: 'virk',
      },
      {
        id: 2,
        username: 'romain',
      },
    ]
  }
}
