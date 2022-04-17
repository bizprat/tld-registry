import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // Add some code here if
    // incoming request should be intecepted

    return next.handle().pipe(
      map((data: any) => {
        // Add code here if
        // final response should be intecepted
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: false,
        });
      }),
    );
  }
}
