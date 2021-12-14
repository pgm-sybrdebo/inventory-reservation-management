import { CreateReservationTimeInput } from './create-reservation-time.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class UpdateReservationTimeInput extends PartialType(CreateReservationTimeInput) {
  @IsNotEmpty()
  @IsUUID('all')
  @Field()
  id: string;
}
