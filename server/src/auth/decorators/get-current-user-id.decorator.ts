import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUserID = createParamDecorator(
  (data: never, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    if (!req.user) return null;

    return req.user.sub;
  },
);
