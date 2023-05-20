import { hash } from 'bcryptjs'
import { prisma } from '../lib/prisma'

interface RegisterParams {
  name: string
  email: string
  password: string
}
export class RegisterUseCase {
  constructor(private usersRepository: any) {}

  async registerUser({ name, email, password }: RegisterParams) {
    const password_hash = await hash(password, 6)

    const userAlreadyTakenThisEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userAlreadyTakenThisEmail) {
      throw new Error('Email already exists.')
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
