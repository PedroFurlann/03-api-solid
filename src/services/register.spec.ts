import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'

describe('Register service', () => {
  it('should hash user password upon registration', async () => {
    const registerService = new RegisterUseCase({
      async findByEmail(email) {
        return null
      },

      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    })

    const { user } = await registerService.registerUser({
      name: 'Pedro',
      email: 'example@gmail.com',
      password: '123455',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123455',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
