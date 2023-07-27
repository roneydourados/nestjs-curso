import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class UserIdCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('UserIdCheckMiddleware', 'antes');

    // verifica se o ID passado em uma rota é um inteiro
    if (isNaN(Number(req.params.id)) || Number(req.params.id) <= 0) {
      throw new BadRequestException('Id informado é inválido');
    }

    console.log('UserIdCheckMiddleware', 'depois');

    //se não barrou ali acima então chama a função next para continuar o fluxo
    next();
  }
}
