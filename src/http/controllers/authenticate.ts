import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-repository'
import { AuthenticateService } from 'src/services/authenticate'
import { InvalidCredentialsError } from 'src/services/errors/invalid-credentials-error'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const usersReposistory = new PrismaUsersRepository()
    const authenticateService = new AuthenticateService(usersReposistory)

    await authenticateService.execute({
      email,
      password,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }
    return reply.status(500).send()
  }

  return reply.status(200).send()
}
