import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    console.log(req.session.userId);
    return req.session.userId;
  },
);
