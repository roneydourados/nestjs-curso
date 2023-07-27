import { Body, Controller, Headers, Post } from '@nestjs/common';
import { AuthDTO } from './dtos/auth.dto';
import { AuthService } from './auth.service';
import { AuthRegisterDTO } from './dtos/register.dto';
import { AuthForgetDTO } from './dtos/forget.dto';
import { AuthResetDTO } from './dtos/reset.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { email, password }: AuthDTO) {
    return this.authService.login(email, password);
  }

  @Post('register')
  async register(@Body() { email, name, password }: AuthRegisterDTO) {
    return await this.authService.register({ email, name, password });
  }

  @Post('forget')
  async forget(@Body() { email }: AuthForgetDTO) {
    await this.authService.forget(email);
  }

  @Post('reset')
  async reset(@Body() { password }: AuthResetDTO) {
    await this.authService.reset(password);
  }

  @Post('me')
  async me(@Headers('authorization') token) {
    return await this.authService.me(token.split(' ')[1]);
  }
}
