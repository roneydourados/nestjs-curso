import { Injectable } from '@nestjs/common';
import { UserDTO } from './dtos/user.create.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async list() {
    return await this.userRepository.list();
  }

  async show(id: number) {
    return await this.userRepository.show(id);
  }

  async create({ email, name, password }: UserDTO) {
    return await this.userRepository.create({
      email,
      name,
      password,
    });
  }

  async update(id: number, { email, name, password }: UserDTO) {
    return await this.userRepository.update(id, {
      email,
      name,
      password,
    });
  }

  async delete(id: number) {
    await this.userRepository.delete(id);
  }
}
