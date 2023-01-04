import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UserDto {
  @IsString()
  nickname: string;

  @Type(() => Boolean)
  @IsBoolean()
  is_kakao: boolean;

  @Type(() => Number)
  @IsNumber()
  kakao_id: number;
}