import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { HideSensitiveData } from '../decorators/hide-sensitive-info.decorator';
import { UsersService } from './users.service';
import { UpdateUserDto, UserDto } from './dto';

// TODO: Catch and log errors related to query run failed

@Controller('/users')
@HideSensitiveData(UserDto)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
