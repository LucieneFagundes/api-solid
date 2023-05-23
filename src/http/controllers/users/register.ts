import { FastifyReply, FastifyRequest } from 'fastify'
import { UserAlreadyExistsError } from 'src/services/errors/user-already-exists-error'
import { makeRegisterService } from 'src/services/factories/make-register-service'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const registerService = makeRegisterService()

    await registerService.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    return reply.status(500).send()
  }

  return reply.status(201).send()
}
