import { Controller, Get } from '@nestjs/common';
import { CurrentUserID } from 'src/auth/decorators/get-current-user-id.decorator';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/me')
  async me(@CurrentUserID() uid: number): Promise<User> {
    return await this.usersService.me(uid);
  }
}
