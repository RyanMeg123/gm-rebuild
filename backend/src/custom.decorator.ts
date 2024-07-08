import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';

export const RequireLogin = () => SetMetadata('require-login', true);
export const RequirePermission = (...permissions: string[]) => {
  console.log(permissions, 'permissions1111');
  return SetMetadata('require-permission', permissions);
};

export const UserInfo = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user) {
      return null;
    }
    return data ? request.user[data] : request.user;
  },
);
