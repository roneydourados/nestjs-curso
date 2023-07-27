import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDTO } from 'src/user/dtos/user.dto';
import { UserRepositoryDTO } from '../user.repository.dto';

@Injectable()
export class UserRepository implements UserRepositoryDTO {
  constructor(private readonly db: PrismaService) {}

  async list(): Promise<UserDTO[]> {
    return await this.db.user.findMany();
  }

  async show(id: number): Promise<UserDTO> {
    return await this.exists(id);
  }

  async create(data: UserDTO): Promise<UserDTO> {
    return await this.db.user.create({
      data,
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
      },
    });
  }

  async update(id: number, data: UserDTO): Promise<UserDTO> {
    await this.exists(id);

    return await this.db.user.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.exists(id);

    await this.db.user.delete({
      where: {
        id,
      },
    });
  }

  async exists(id: number): Promise<UserDTO> {
    const user = await this.db.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`Nenhum dado encontrado com id: ${id}`);
    }

    return user;
  }
}
