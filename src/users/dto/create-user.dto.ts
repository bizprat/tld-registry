import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: '$property is required' })
  @IsEmail({}, { message: '$value is not a valid $property' })
  email: string;

  @IsString({ message: '$property is not a string type' })
  @IsNotEmpty()
  @MinLength(6, {
    message: '$property must have atleast $constraint1 characters',
  })
  password: string;
}
