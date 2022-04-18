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
} from '@nestjs/common';
import { HideSensitiveValues } from '../decorators/hide-sensitive-info.decorator';
import { UsersService } from './users.service';
import { AuthDto, UpdateUserDto, UserDto } from './dto';

// TODO: Catch and log errors related to query run failed

@Controller('/users')
@HideSensitiveValues(UserDto)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Create new user
  @Post()
  async create(@Body() credentials: AuthDto) {
    return await this.usersService.create(credentials).catch((err) => {
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
  async loginWithEmail(@Body() loginInfo: AuthDto) {
    // FIX: 201 Created status code while it should be 200
    return await this.usersService.loginWithEmail(loginInfo);
  }
}
