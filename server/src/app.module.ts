import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from 'config/configuration';
import { RoomsModule } from './rooms/rooms.module';
import config from '../ormconfig';
@Module({
  imports: [
    RoomsModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRoot(config),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
