import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { UserAlreadyTakenError } from './errors/user-already-taken-error'

describe('Register service', () => {
  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterUseCase(usersRepository)

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

  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterUseCase(usersRepository)

    const email = 'example@gmail.com'

    await registerService.registerUser({
      name: 'Pedro',
      email,
      password: '123455',
    })

    expect(() =>
      registerService.registerUser({
        name: 'Pedro',
        email,
        password: '123455',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyTakenError)
  })

  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterUseCase(usersRepository)

    const { user } = await registerService.registerUser({
      name: 'Pedro',
      email: 'example@gmail.com',
      password: '123455',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
