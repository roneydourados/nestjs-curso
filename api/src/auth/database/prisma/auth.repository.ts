import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthRepositoryDTO } from '../auth.repository.dto';
import { UserDTO } from 'src/user/dtos/user.dto';
import { Token } from 'src/auth/dtos/auth.token.dto';

@Injectable()
export class AuthRepository implements AuthRepositoryDTO {
  constructor(
    private readonly db: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async createToken?(user: UserDTO): Promise<string> {
    return this.jwtService.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      {
        expiresIn: '1 days',
        subject: user.id.toString(),
        issuer: 'login',
        audience: 'users',
      },
    );
  }

  async checkToken(token: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async login(email: string, password: string): Promise<Token> {
    const user = await this.db.user.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email e/ou senha inválido');
    }

    const token = await this.createToken(user);

    return {
      accessToken: token,
    };
  }

  async forget(email: string): Promise<void> {
    const user = await this.db.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email inválido');
    }
  }

  async reset(password: string, token: string): Promise<Token> {
    // se token for valido, então trocar a senha
    const id = 0;

    const user = await this.db.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });

    const tokenUser = await this.createToken(user);

    return {
      accessToken: tokenUser,
    };
  }

  async register(user: UserDTO): Promise<Token> {
    const userRegister = await this.userService.create(user);

    const token = await this.createToken(userRegister);

    return {
      accessToken: token,
    };
  }
}
