import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  IsNumber,
  IsPostalCode,
  IsBoolean,
  IsOptional,
  IsEmail,
  MinLength,
  IsPhoneNumber,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  middleName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional({ message: '$property is required' })
  @IsEmail({}, { message: '$value is not a valid $property' })
  email: string;

  @IsOptional()
  @MinLength(6, {
    message: '$property must have atleast $constraint1 characters',
  })
  password: string;

  // TODO: Validate arrays of phone number by country
  @IsOptional()
  @IsPhoneNumber('IN', { each: true })
  phone: Array<string>;

  @IsOptional()
  @IsNumber()
  countryId: number;

  @IsOptional()
  @IsNumber()
  stateId: number;

  @IsOptional()
  @IsNumber()
  cityId: number;

  @IsOptional()
  @IsPostalCode()
  postalCode: number;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
