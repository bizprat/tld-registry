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
  Session,
} from '@nestjs/common';
import { HideSensitiveValues } from '../decorators/hide-sensitive-info.decorator';
import { UsersService } from './users.service';
import { AuthDto, UpdateUserDto, UserDto } from './dto';

// TODO: Catch and log errors related to query run failed

@Controller('/users')
@HideSensitiveValues(UserDto)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/whoami')
  whoami(@Session() session: any) {
    return this.usersService.findOne(session.userId);
  }

  // Get user by ID
  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(+id);
  }

  // Update user by ID
  @Patch('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  // Delete user by ID (soft delete)
  @Delete('/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(+id);
  }
}
