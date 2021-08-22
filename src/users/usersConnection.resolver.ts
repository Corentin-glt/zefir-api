import { Args, Parent, Query, Resolver, ResolveField } from '@nestjs/graphql';

import { PaginationDTO } from './dto/pagination.input';
import { UsersService } from './users.service';
import { UsersConnection } from './usersConnection.model';

@Resolver(() => UsersConnection)
export class UsersConnectionResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => UsersConnection, { name: 'usersConnection' })
  find(@Args('paginationInput') pagination: PaginationDTO) {
    return {
      limit: pagination.limit || 20,
      offset: pagination.offset,
    };
  }

  @ResolveField('count')
  count() {
    return this.usersService.count();
  }

  @ResolveField('items')
  items(@Parent() parent: PaginationDTO) {
    return this.usersService.find(parent);
  }
}
