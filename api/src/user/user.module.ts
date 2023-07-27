import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserRepository } from './database/prisma/user.repository';
import { UserIdCheckMiddleware } from 'src/middlewares/user-id-check.middleware';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})

/**para usar um middleware use assim */
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserIdCheckMiddleware).forRoutes({
      path: '/users/:id',
      method: RequestMethod.ALL,
    });
  }
}
