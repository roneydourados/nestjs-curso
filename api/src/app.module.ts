import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [forwardRef(() => UserModule), forwardRef(() => AuthModule)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
