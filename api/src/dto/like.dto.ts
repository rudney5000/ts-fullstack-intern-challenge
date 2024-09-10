import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class LikeDto {
  @ApiProperty({ description: 'Идентификатор котика из https://thecatapi.com' })
  cat_id: string;

  @ApiProperty({ description: 'Пользователь, который поставил лайк' })
  user_id: number;

  @ApiPropertyOptional({ description: 'Время создания лайка' })
  created_at: Date;
}
