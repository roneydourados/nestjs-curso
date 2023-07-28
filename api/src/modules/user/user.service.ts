import { Injectable } from '@nestjs/common';
import { UserDTO } from './dtos/user.dto';
import { UserRepository } from './database/prisma/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async list() {
    return await this.userRepository.list();
  }

  async show(id: number) {
    return await this.userRepository.show(id);
  }

  async create(data: UserDTO) {
    return await this.userRepository.create(data);
  }

  async update(id: number, { email, name, password, role }: UserDTO) {
    return await this.userRepository.update(id, {
      email,
      name,
      password,
      role,
    });
  }

  async delete(id: number) {
    await this.userRepository.delete(id);
  }
}
