import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

export interface UserInterface {
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(user: Partial<User>) {
    return this.userRepository.save(this.userRepository.create(user));
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found with id: ' + id);
    }
    return user;
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(+id);
    if (!user) {
      throw new NotFoundException('User not found with id: ' + id);
    }
    Object.assign(user, attrs);
    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found with id: ' + id);
    }
    await this.userRepository.softRemove(user);
  }
}
