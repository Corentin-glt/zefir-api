import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Users } from './entities/users.entity';

@ObjectType()
export class UsersConnection {
  @Field(() => Int)
  count: number;

  @Field(() => [Users])
  items: Users[];
}
