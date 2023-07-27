import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const ParamId = createParamDecorator(
  (_data: any, context: ExecutionContext) => {
    //aqui decorator para retornar já um inteiro de id quando vir de rota
    return Number(context.switchToHttp().getRequest().params.id);
  },
);
