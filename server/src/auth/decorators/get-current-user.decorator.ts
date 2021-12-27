import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//El data es el parametro con el cual se extrae info
//si esta en type "never" no da la opcion para usarlo

export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    if (!data) return req.user;

    return req.user[data];
  },
);
