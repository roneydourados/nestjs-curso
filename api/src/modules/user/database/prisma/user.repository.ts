import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UserRepositoryDTO } from "../user.repository.dto";
import { UserDTO } from "../../dtos/user.dto";
import * as bcrypt from "bcrypt";

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
    const salt = await bcrypt.genSalt();

    const hashPassword = await bcrypt.hash(data.password, salt);
    // Omit `id` from DTO to satisfy Prisma's create input type
    const { id, ...createData } = data;

    const dataToCreate = {
      ...createData,
      password: hashPassword,
      // connect to a clinic; use env CLINICA_ID or fallback to 1
      clinica: {
        connect: {
          id: Number(process.env.CLINICA_ID) || 1,
        },
      },
    };

    return await this.db.user.create({
      data: dataToCreate,
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

    const salt = await bcrypt.genSalt();

    const hashPassword = await bcrypt.hash(data.password, salt);
    // Omit `id` from DTO to satisfy Prisma's update input type
    const { id: _id, ...updateData } = data;

    const dataToUpdate = {
      ...updateData,
      password: hashPassword,
    };

    return await this.db.user.update({
      data: dataToUpdate,
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
