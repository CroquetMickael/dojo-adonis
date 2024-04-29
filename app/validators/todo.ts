import vine from '@vinejs/vine'

/**
 * Validates the post's creation action
 */
export const todosValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(1),
  })
)
