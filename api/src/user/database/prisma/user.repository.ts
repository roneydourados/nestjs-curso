import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDTO } from 'src/user/dtos/user.dto';
import { UserRepositoryDTO } from 'src/user/dtos/user.repository.dto';

@Injectable()
export class UserRepository implements UserRepositoryDTO {
  constructor(private readonly prisma: PrismaService) {}

  async list(): Promise<UserDTO[]> {
    return await this.prisma.user.findMany();
  }

  async show(id: number): Promise<UserDTO> {
    return await this.exists(id);
  }

  async create(data: UserDTO): Promise<UserDTO> {
    return await this.prisma.user.create({
      data,
      select: {
        email: true,
        name: true,
        password: true,
      },
    });
  }

  async update(id: number, data: UserDTO): Promise<UserDTO> {
    await this.exists(id);

    return await this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.exists(id);

    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async exists(id: number): Promise<UserDTO> {
    const user = await this.prisma.user.findUnique({
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

// import { Injectable, NotFoundException } from '@nestjs/common';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { UserDTO } from '../../dtos/user.create.dto';

// @Injectable()
// export class UserRepository {
//   constructor(private readonly prisma: PrismaService) {}

//   async list() {
//     return await this.prisma.user.findMany();
//   }

//   async show(id: number) {
//     return await this.exists(id);
//   }

//   async create({ email, name, password }: UserDTO) {
//     return await this.prisma.user.create({
//       data: {
//         email,
//         name,
//         password,
//       },
//       select: {
//         email: true,
//         name: true,
//         password: true,
//       },
//     });
//   }

//   async update(id: number, { email, name, password }: UserDTO) {
//     await this.exists(id);

//     return await this.prisma.user.update({
//       data: {
//         email,
//         name,
//         password,
//       },
//       where: {
//         id,
//       },
//     });
//   }

//   async delete(id: number) {
//     await this.exists(id);

//     await this.prisma.user.delete({
//       where: {
//         id,
//       },
//     });
//   }

//   async exists(id: number) {
//     const user = await this.prisma.user.findUnique({
//       where: {
//         id,
//       },
//     });

//     if (!user) {
//       throw new NotFoundException(`Nenhum dado encontrado com id: ${id}`);
//     }

//     return user;
//   }
// }
