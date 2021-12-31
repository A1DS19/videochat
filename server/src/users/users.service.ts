import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async me(uid: number): Promise<User> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('id = :uid', { uid })
      .select(['user.email', 'user.id', 'user.created_at'])
      .getOne();

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    return user;
  }
}
