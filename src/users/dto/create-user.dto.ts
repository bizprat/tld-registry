import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: '$value is not a valid $property' })
  email: string;

  @IsString({ message: '$property is not a string type' })
  @MinLength(6, {
    message: '$property must have atleast $constraint1 characters',
  })
  password: string;
}
