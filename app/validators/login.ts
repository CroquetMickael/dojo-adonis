import vine from '@vinejs/vine'

/**
 * Validates the post's creation action
 */
export const signupValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(6),
    email: vine.string().trim(),
    password: vine.string().trim().escape().minLength(6),
  })
)
