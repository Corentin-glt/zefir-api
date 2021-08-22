import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Users } from './entities/users.entity';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UsersConnectionResolver } from './usersConnection.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersService, UsersResolver, UsersConnectionResolver],
})
export class UsersModule {}
