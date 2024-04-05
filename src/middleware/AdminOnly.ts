import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AdminOnly implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // return true;
    if (request.user.permissions.includes('super_admin')) {
      return true;
    } else {
      return false;
    }
  }
}
