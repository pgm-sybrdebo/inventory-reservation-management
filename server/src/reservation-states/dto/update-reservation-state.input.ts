import { CreateReservationStateInput } from './create-reservation-state.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class UpdateReservationStateInput extends PartialType(
  CreateReservationStateInput,
) {
  @IsNotEmpty()
  @IsUUID('all')
  @Field()
  id: string;
}
