import { Injectable } from '@nestjs/common';

import { Token } from './dtos/auth.token.dto';
import { AuthRepository } from './database/prisma/auth.repository';
import { UserDTO } from '../user/dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async login(email: string, password: string) {
    return this.authRepository.login(email, password);
  }

  async forget(email: string): Promise<void> {
    this.authRepository.forget(email);
  }

  async reset(password: string, token: string): Promise<Token> {
    return await this.authRepository.reset(password, token);
  }

  async register(user: UserDTO): Promise<Token> {
    return await this.authRepository.register(user);
  }

  async me(token: string): Promise<object> {
    return await this.authRepository.me(token);
  }

  isValidToken(token: string): boolean {
    return this.authRepository.isValidToken(token);
  }

  checkToken(token: string): object {
    return this.authRepository.checkToken(token);
  }
}
