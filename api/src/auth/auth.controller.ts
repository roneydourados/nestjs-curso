import { Body, Controller, Post } from '@nestjs/common';
import { AuthDTO } from './dtos/auth.dto';
//import { AuthForgetDTO } from './dtos/forget.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { email, password }: AuthDTO) {
    return this.authService.login(email, password);
  }

  // @Post('register')
  // async register(@Body() { email, name, password }: AuthRegisterDTO) {
  //   return await this.authService.register({ email, name, password });
  // }

  // @Post('forgert')
  // async forget(@Body() { email }: AuthForgetDTO) {
  //   await this.authService.forget(email);
  // }

  // @Post('reset')
  // async reset(@Body() { password, token }: AuthResetDTO) {
  //   await this.authService.reset(password, token);
  // }
}
