import {
  Args,
  Mutation,
  Parent,
  Resolver,
  ResolveField,
} from '@nestjs/graphql';
import { Anagram } from 'src/anagrams/entities/anagram.entity';

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

  @ResolveField(() => Anagram)
  anagram(@Parent() parent: Users) {
    return this.usersService.getAnagram(parent.id);
  }
}
