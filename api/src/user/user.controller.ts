import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UserDTO } from './dtos/user.create.dto';

import { UserService } from './user.service';
import { ParamId } from 'src/decorators/param-id.decorator';

// aqui vai interceptar todo o controller
// @UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // aqui intercepta apenas uma rota
  //@UseInterceptors(LogInterceptor)
  @Get()
  async index() {
    return await this.userService.list();
  }

  @Get(':id')
  async show(@ParamId() id: number) {
    return await this.userService.show(id);
  }

  @Post()
  async create(@Body() { email, name, password }: UserDTO) {
    return await this.userService.create({ email, name, password });
  }

  @Put(':id')
  async update(
    @Body() { email, name, password }: UserDTO,
    @ParamId() id: number,
  ) {
    return await this.userService.update(id, { email, name, password });
  }

  @Delete(':id')
  async destroy(@ParamId() id: number) {
    await this.userService.delete(id);
  }
}
