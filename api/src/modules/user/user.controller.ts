import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserDTO } from './dtos/user.dto';

import { UserService } from './user.service';
import { ParamId } from 'src/decorators/param-id.decorator';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.Admin)
  @Get()
  async index() {
    return await this.userService.list();
  }

  @Roles(Role.Admin)
  @Get(':id')
  async show(@ParamId() id: number) {
    return await this.userService.show(id);
  }

  @Roles(Role.Admin)
  @Post()
  async create(@Body() { email, name, password }: UserDTO) {
    return await this.userService.create({ email, name, password });
  }

  @Roles(Role.Admin)
  @Put(':id')
  async update(
    @Body() { email, name, password }: UserDTO,
    @ParamId() id: number,
  ) {
    return await this.userService.update(id, { email, name, password });
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async destroy(@ParamId() id: number) {
    await this.userService.delete(id);
  }
}
