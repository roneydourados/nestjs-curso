import {
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthDTO } from './dtos/auth.dto';
import { AuthService } from './auth.service';
import { AuthRegisterDTO } from './dtos/register.dto';
import { AuthForgetDTO } from './dtos/forget.dto';
import { AuthResetDTO } from './dtos/reset.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

import { join } from 'path';
import { FileService } from '../file/file.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly fileService: FileService,
  ) {}

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

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@User('email') user: any) {
    return { user };
  }

  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  @Post('photo')
  async uploadPhoto(
    @User() user: any,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/*' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 50 }),
        ],
      }),
    )
    photo: Express.Multer.File,
  ) {
    const path = join(
      __dirname,
      '..',
      '..',
      'storage',
      'photos',
      `photo-${user.id}.jpg`,
    );

    try {
      await this.fileService.upload(photo, path);

      return { success: true };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
