import { Injectable } from '@nestjs/common';
import { UserDTO } from 'src/user/dtos/user.dto';
import { Token } from './dtos/auth.token.dto';
import { AuthRepository } from './database/prisma/auth.repository';

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
}
