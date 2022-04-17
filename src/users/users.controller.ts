import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

// TODO: Catch and log errors related to query run failed

@UseInterceptors(new SerializeInterceptor(UserDto))
@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Create new user
  @Post()
  create(@Body() createUserDto: CreateUserDto): object {
    return this.usersService.create(createUserDto).catch((err) => {
      throw new HttpException({ message: err.message }, HttpStatus.BAD_REQUEST);
    });
  }

  // Get user by ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(+id);
  }

  // Update user by ID
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  // Delete user by ID (soft delete)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(+id);
  }

  // Login user with email and password
  @Post('login')
  async loginWithEmail(@Body() loginInfo: CreateUserDto) {
    return await this.usersService.loginWithEmail(
      loginInfo.email,
      loginInfo.password,
    );
  }
}
