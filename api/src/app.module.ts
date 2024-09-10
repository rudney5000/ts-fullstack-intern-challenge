import { Module } from '@nestjs/common';
import LikeController from './controllers/like.controller';
import UserController from './controllers/user.controller';
import LikeService from '../../backend/src/service/likeService';
import UserService from '../../backend/src/service/userService';
import CatController from './controllers/cat.controller';

@Module({
  imports: [],
  controllers: [CatController, LikeController, UserController],
  providers: [LikeService, UserService],
})
export class AppModule {}
