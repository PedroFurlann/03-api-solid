import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { UserAlreadyTakenError } from './errors/user-already-taken-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.registerUser({
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
    const email = 'example@gmail.com'

    await sut.registerUser({
      name: 'Pedro',
      email,
      password: '123455',
    })

    await expect(() =>
      sut.registerUser({
        name: 'Pedro',
        email,
        password: '123455',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyTakenError)
  })

  it('should be able to register', async () => {
    const { user } = await sut.registerUser({
      name: 'Pedro',
      email: 'example@gmail.com',
      password: '123455',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
