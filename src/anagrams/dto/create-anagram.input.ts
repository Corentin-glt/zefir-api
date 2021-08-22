import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAnagramInput {
  @Field()
  user_id: string;
}
