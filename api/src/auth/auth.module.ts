import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { AuthRepository } from './database/prisma/auth.repository';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    JwtModule.register({
      secret: 'kdycZ8x9ra|Ha!ciE+*=.zLOk%o=T)-',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
  exports: [],
})
export class AuthModule {}
