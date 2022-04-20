import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async hashPassword(password: string, saltKey?: string) {
    const scrypt = promisify(_scrypt);
    const salt = saltKey || randomBytes(32).toString('hex');
    const hash = (await scrypt(password, salt, 64)) as Buffer;
    return salt + '$' + hash.toString('hex');
  }

  async create(user: Partial<User>) {
    user.password = await this.hashPassword(user.password);
    return await this.userRepository.save(this.userRepository.create(user));
  }

  async findOne(id: number) {
    if (!id) throw new NotFoundException('User not found with id: ' + id);
    const user = await this.userRepository.findOneOrFail(id);
    if (!user) throw new NotFoundException('User not found with id: ' + id);
    return user;
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(+id);
    if (!user) {
      throw new NotFoundException('User not found with id: ' + id);
    }
    if (attrs.password) {
      attrs.password = await this.hashPassword(attrs.password);
    }
    Object.assign(user, attrs);
    return await this.userRepository.save(user);
  }

  async disableUser(id: number) {
    const user = await this.update(+id, { isActive: false });
    console.log(`${user.id} is disabled`);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found with id: ' + id);
    }
    await this.disableUser(+id);
    await this.userRepository.softRemove(user);
  }

  async loginWithEmail(credentials: Partial<User>) {
    const { email, password } = credentials;
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('-Invalid login details-');
    }

    const [dbSalt] = user.password.split('$');

    const hash = await this.hashPassword(password, dbSalt);

    if (user.password !== hash) {
      throw new UnauthorizedException('Invalid login details');
    }
    return user;
  }
}
