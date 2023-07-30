import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRepositoryDTO } from '../auth.repository.dto';
import { UserService } from 'src/modules/user/user.service';
import { UserDTO } from 'src/modules/user/dtos/user.dto';
import { Token } from '../../dtos/auth.token.dto';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer/dist';

@Injectable()
export class AuthRepository implements AuthRepositoryDTO {
  private issuer = 'login';
  private audience = 'users';

  constructor(
    private readonly db: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly mailer: MailerService,
  ) {}

  createToken?(user: UserDTO): string {
    return this.jwtService.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      {
        expiresIn: '1 days',
        subject: user.id.toString(),
        issuer: this.issuer,
        audience: this.audience,
      },
    );
  }

  checkToken(token: string): object {
    try {
      const tokenData = this.jwtService.verify(token, {
        audience: this.audience,
        issuer: this.issuer,
      });

      return tokenData;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async login(email: string, password: string): Promise<Token> {
    const user = await this.db.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email e/ou senha inválido');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Email e/ou senha inválido');
    }

    const token = this.createToken(user);

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

    const token = this.jwtService.sign(
      {
        id: user.id,
      },
      {
        expiresIn: '30 minutes',
        subject: user.id.toString(),
        issuer: 'forget',
        audience: 'users',
      },
    );

    try {
      await this.mailer.sendMail({
        subject: 'Recuperação de senha',
        to: '',
        template: 'forget',
        context: {
          name: user.name,
          token,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async reset(password: string, token: string): Promise<Token> {
    try {
      const data: any = this.jwtService.verify(token, {
        audience: 'users',
        issuer: 'forget',
      });

      if (isNaN(data.id)) {
        throw new BadRequestException('Id de usuário inválido!');
      }

      const salt = await bcrypt.genSalt();

      const hashPassword = await bcrypt.hash(password, salt);

      const user = await this.db.user.update({
        where: {
          id: Number(data.id),
        },
        data: {
          password: hashPassword,
        },
      });

      const tokenUser = this.createToken(user);

      return {
        accessToken: tokenUser,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async register(user: UserDTO): Promise<Token> {
    const userRegister = await this.userService.create(user);

    const token = this.createToken(userRegister);

    return {
      accessToken: token,
    };
  }

  async me(token: string): Promise<object> {
    return this.checkToken(token);
  }

  isValidToken?(token: string): boolean {
    try {
      this.checkToken(token);

      return true;
    } catch {
      return false;
    }
  }
}
