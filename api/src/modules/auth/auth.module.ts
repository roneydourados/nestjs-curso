import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './database/prisma/auth.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: 'kdycZ8x9ra|Ha!ciE+*=.zLOk%o=T)-',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
  exports: [AuthService],
})
export class AuthModule {}
