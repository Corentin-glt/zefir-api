import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';

import { UserCreateDTO } from './dto/create-user.input';
import { Users } from './entities/users.entity';
import { UsersService } from './users.service';

@Resolver(() => Users)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [Users], { name: 'getUsers' })
  find() {
    return this.usersService.find();
  }

  @Mutation(() => Users, { name: 'createUser' })
  create(@Args('user') user: UserCreateDTO) {
    return this.usersService.create(user);
  }
}
