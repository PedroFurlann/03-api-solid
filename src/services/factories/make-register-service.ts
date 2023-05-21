import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterService() {
  const usersRepository = new PrismaUsersRepository()
  const registerUser = new RegisterUseCase(usersRepository)

  return registerUser
}
