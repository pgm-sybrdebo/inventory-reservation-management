import { CreateReservationInput } from './create-reservation.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class UpdateReservationInput extends PartialType(
  CreateReservationInput,
) {
  @IsNotEmpty()
  @IsUUID('all')
  @Field()
  id: string;
}
