import { hash } from 'bcryptjs'
import { UsersRepository } from '../repositories/users-repository'
import { UserAlreadyTakenError } from './errors/user-already-taken-error'

interface RegisterParams {
  name: string
  email: string
  password: string
}
export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async registerUser({ name, email, password }: RegisterParams) {
    const password_hash = await hash(password, 6)

    const userAlreadyTakenThisEmail = await this.usersRepository.findByEmail(
      email,
    )

    if (userAlreadyTakenThisEmail) {
      throw new UserAlreadyTakenError()
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
