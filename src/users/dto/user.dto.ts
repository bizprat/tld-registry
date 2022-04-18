import { PartialType } from '@nestjs/mapped-types';
import { Expose, Exclude } from 'class-transformer';
import { AuthDto } from './auth.dto';

// TODO: Use either Expose or Exclude
export class UserDto extends PartialType(AuthDto) {
  @Expose()
  id?: number;

  @Exclude()
  password?: string;
}
