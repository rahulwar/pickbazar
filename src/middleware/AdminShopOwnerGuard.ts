import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AdminShopKeeperAccess implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    console.log('middleware', request.user);
    return true;
    // if (
    //   request.user.permissions.includes('super_admin') ||
    //   request.user.permissions.includes('store_owner')
    // ) {
    //   return true;
    // } else {
    //   return false;
    // }
  }
}
