import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PaginationDTO {
  @Field()
  limit?: number;

  @Field()
  offset?: number;
}
