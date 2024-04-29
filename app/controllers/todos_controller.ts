import { HttpContext } from '@adonisjs/core/http'

import Todo from '#models/todo'
import { todosValidator } from '#validators/todo'

export default class TodosController {
  async index({ view, auth }: HttpContext) {
    // Render the view 'todos.edge' with todos fetched from the database
    const todos = await Todo.findManyBy('user_id', auth.user!.id)
    return view.render('pages/todos', {
      todos,
    })
  }

  async create({ request, auth, response }: HttpContext) {
    await request.validateUsing(todosValidator)

    try {
      const { title } = request.only(['title'])
      await Todo.create({
        title,
        status: 'pending',
        description: '',
        user_id: auth.user!.id,
      })
      return response.redirect('/')
    } catch (error) {
      throw error
    }
  }

  async update({ params }: HttpContext) {
    const { id } = params

    try {
      const todo = await Todo.find(id)
      if (todo) {
        todo.status = todo.status === 'pending' ? 'completed' : 'pending'
        await todo.save()
      }
    } catch (error) {
      throw error
    }
  }

  async delete({ params }: HttpContext) {
    const { id } = params

    try {
      const todo = await Todo.findOrFail(id)
      await todo.delete()
    } catch (error) {
      throw error
    }
  }
}
