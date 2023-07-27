import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

export class LogInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const initialDate = Date.now();

    return next.handle().pipe(
      tap(() => {
        const route = context.switchToHttp().getRequest();
        console.log(`Rota: ${route.url}`);
        console.log(`Método: ${route.method}`);
        console.log(
          `Execução demorou: ${Date.now() - initialDate} Milesegundos`,
        );
      }),
    );
  }
}
