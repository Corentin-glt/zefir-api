import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserCreateDTO {
  @Field()
  email: string;
}
