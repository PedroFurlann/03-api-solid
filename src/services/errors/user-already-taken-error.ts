export class UserAlreadyTakenError extends Error {
  constructor() {
    super('Email already exists.')
  }
}
