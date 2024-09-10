import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import UserDto from '../dto/user.dto';
import UserService from '../../../backend/src/service/userService';
import AuthGuard from '../auth/auth';

@Controller('user')
export default class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async create(@Body() userDto: UserDto, @Res() res: Response) {
    try {
      const { user, token } = await this.userService.postUser(userDto);
      return res
        .setHeader('X-Auth-Token', token)
        .status(HttpStatus.CREATED)
        .json(user);
    } catch (err) {
      return res.status(HttpStatus.OK).json({ error: err.message });
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async get(@Req() req: Request, @Res() res: Response) {
    const userId = req['userId'];
    try {
      const likes = await this.userService.getUser(userId);
      return res.status(HttpStatus.OK).json(likes);
    } catch (err) {
      return res.status(HttpStatus.NOT_FOUND).json({ error: err.message });
    }
  }
}
