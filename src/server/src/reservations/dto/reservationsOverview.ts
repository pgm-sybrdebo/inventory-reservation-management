import { ObjectType, Field } from '@nestjs/graphql';
@ObjectType()
export class ReservationsOverview {
  @Field()
  month: string;

  @Field()
  total_reservations: number;
}
