import { ObjectType, Field } from '@nestjs/graphql';
@ObjectType()
export class Total {
  @Field()
  total: number;
}