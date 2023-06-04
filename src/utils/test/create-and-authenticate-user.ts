import request from 'supertest'
import { FastifyInstance } from 'fastify'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'Pedro Furlan',
    email: 'pedro.furlan@example.com',
    password: '123455',
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