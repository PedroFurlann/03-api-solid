import request from 'supertest'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { hash } from 'bcryptjs'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isADMIN = false,
) {
  await prisma.user.create({
    data: {
      name: 'Pedro Furlan',
      email: 'pedro.furlan@example.com',
      password_hash: await hash('123455', 6),
      role: isADMIN ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'pedro.furlan@example.com',
    password: '123455',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
