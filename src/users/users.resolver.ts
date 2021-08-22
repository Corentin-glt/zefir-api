import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { UserCreateDTO } from './dto/create-user.input';
import { Users } from './entities/users.entity';
import { UsersService } from './users.service';

@Resolver(() => Users)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation(() => Users, { name: 'createUser' })
  create(@Args('userInput') user: UserCreateDTO) {
    return this.usersService.create(user);
  }
}
