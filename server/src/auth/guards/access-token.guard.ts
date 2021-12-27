import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

//Retrieve metadata for a specified key for a specified set of targets and return a first not undefined value.
//Pasos para settear guards globales con decoradores que hagan rutas publicas
//settear APP_GUARD en el app.module
//crear decorador Public y settear metadata 'isPublic' a true
//ir a esta guard y incluir el reflector(puede extraer metadata)
//hacer lo que esta en canActivate()

@Injectable()
export class AtGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    return super.canActivate(context);
  }
}
