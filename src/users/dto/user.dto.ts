import { Expose, Exclude } from 'class-transformer';

// TODO: Use either Expose or Exclude
export class UserDto {
  @Expose()
  id: number;

  @Exclude()
  password: string;
}
