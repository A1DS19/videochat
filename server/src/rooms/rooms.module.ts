import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsController } from './rooms.controller';
import { Rooms } from './rooms.entity';
import { RoomsService } from './rooms.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Rooms])],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
