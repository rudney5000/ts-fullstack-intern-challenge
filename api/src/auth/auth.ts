import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import UserService from '../../../backend/src/service/userService';

@Injectable()
export default class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    const userId = request.headers['x-user-id'];

    if (!authHeader || !userId) {
      throw new UnauthorizedException();
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const isEqual = await this.userService.compareTokens(userId, token);
      if (!isEqual) {
        throw new UnauthorizedException();
      }
      request['userId'] = userId;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
