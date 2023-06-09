import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeRegisterService } from '../../../services/factories/make-register-service'
import { UserAlreadyTakenError } from '../../../services/errors/user-already-taken-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const registerUser = makeRegisterService()

    await registerUser.registerUser({ name, email, password })
  } catch (error) {
    if (error instanceof UserAlreadyTakenError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}
