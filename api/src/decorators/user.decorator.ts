import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from '@nestjs/common';

export const User = createParamDecorator(
  (filter: string, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();

    if (filter) {
      return req.user[filter];
    }

    if (req.user) {
      return req.user;
    }

    throw new NotFoundException(
      'Usuário não encontrado, ou sem o AuthGuard informado na rota!',
    );
  },
);
