import { Injectable } from '@nestjs/common';
import { UserCreateDTO } from './dtos/user.create.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async list() {
    return await this.prisma.user.findMany();
  }

  async show(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async create({ email, name, password }: UserCreateDTO) {
    return await this.prisma.user.create({
      data: {
        email,
        name,
        password,
      },
      select: {
        email: true,
        name: true,
        password: true,
      },
    });
  }

  async update(id: number, { email, name, password }: UserCreateDTO) {
    return await this.prisma.user.update({
      data: {
        email,
        name,
        password,
      },
      where: {
        id,
      },
    });
  }

  async delete(id: number) {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
