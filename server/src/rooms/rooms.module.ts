import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { RoomsController } from './rooms.controller';
import { Room } from './rooms.entity';
import { RoomsService } from './rooms.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Room, User])],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
