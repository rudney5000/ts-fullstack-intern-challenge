import { ApiProperty } from '@nestjs/swagger';

export default class UserDto {
  @ApiProperty()
  login: string;

  @ApiProperty()
  password: string;
}
