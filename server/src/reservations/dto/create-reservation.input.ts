import { InputType, Field } from '@nestjs/graphql';
import { IsAlphanumeric, IsNotEmpty, IsUUID } from 'class-validator';
import { Timestamp } from 'typeorm';

@InputType()
export class CreateReservationInput {
  @IsNotEmpty()
  @IsUUID('all')
  @Field()
  device_id: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  @Field()
  reservation_state_id: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  @Field()
  user_id: string;

  @IsNotEmpty()
  @Field()
  start_date: Date;

  @IsNotEmpty()
  @Field()
  end_date: Date;

}
