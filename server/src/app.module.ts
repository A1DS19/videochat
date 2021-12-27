import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from 'config/configuration';
import { RoomsModule } from './rooms/rooms.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import config from '../ormconfig';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './auth/guards/access-token.guard';
@Module({
  imports: [
    RoomsModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRoot(config),
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
