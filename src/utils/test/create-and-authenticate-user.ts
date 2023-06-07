import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { prisma } from 'src/lib/prisma'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.user.create({
    data: {
      name: 'Jane Doe',
      email: 'jdoe@example.com',
      password_hash: await hash('123456', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'jdoe@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
