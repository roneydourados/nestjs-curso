import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const { authorization } = req.headers;

    try {
      const data = this.authService.checkToken(
        (authorization ?? '').split(' ')[1],
      ) as any;

      req.tokenPayload = data;

      req.user = await this.userService.show(data.id);

      return true;
    } catch {
      return false;
    }
  }
}
