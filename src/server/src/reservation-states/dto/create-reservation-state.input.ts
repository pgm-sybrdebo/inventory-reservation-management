import { InputType, Field } from '@nestjs/graphql';
import { IsAlpha, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateReservationStateInput {
  @IsNotEmpty()
  @IsAlpha()
  @Field()
  name: string;
}
