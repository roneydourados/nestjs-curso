import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserCreateDTO } from './dtos/user.create.dto';
import { UserUpdateDTO } from './dtos/user.update.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async index() {
    return await this.userService.list();
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.show(id);
  }

  @Post()
  async create(@Body() { email, name, password }: UserCreateDTO) {
    return await this.userService.create({ email, name, password });
  }

  @Put(':id')
  async update(
    @Body() { email, name, password }: UserUpdateDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.userService.update(id, { email, name, password });
  }

  @Delete(':id')
  async destroy(@Param('id', ParseIntPipe) id: number) {
    await this.userService.delete(id);
  }
}
