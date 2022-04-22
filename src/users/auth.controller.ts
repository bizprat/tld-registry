import {
  Body,
  Controller,
  Get,
  Post,
  HttpException,
  HttpStatus,
  Session,
} from '@nestjs/common';
import { CurrentUser, HideSensitiveData } from '../decorators';
import { UsersService } from './users.service';
import { AuthDto, UserDto } from './dto';

@Controller('/auth')
@HideSensitiveData(UserDto)
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  // Sign up a user
  @Post('/signup')
  async signup(@Body() credentials: AuthDto) {
    return await this.usersService.create(credentials).catch((err) => {
      throw new HttpException({ message: err.message }, HttpStatus.BAD_REQUEST);
    });
  }

  // Login user with email and password
  @Post('/login')
  async loginWithEmail(@Body() loginInfo: AuthDto, @Session() session: any) {
    // FIX: 201 Created status code while it should be 200
    const user = await this.usersService.loginWithEmail(loginInfo);
    session.userId = user.id;
    return user;
  }

  // Logout user
  @Post('/logout')
  logout(@Session() session: any) {
    session.userId = null;
  }

  // @Get('/whoami')
  // whoami(@Session() session: any) {
  //   return this.usersService.findOne(session.userId);
  // }

  @Get('/whoami')
  whoAmI(@CurrentUser() user: string) {
    return user;
  }
}
