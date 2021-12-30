import { InputType, Field } from '@nestjs/graphql';
import { IsAlphanumeric, IsDate, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { Timestamp } from 'typeorm';

@InputType()
export class CreateReservationInput {
  @IsNotEmpty()
  @IsUUID('all')
  @Field()
  deviceId: string;

  @IsNotEmpty()
  @IsUUID()
  @Field()
  reservationStateId: string;

  @IsNotEmpty()
  @IsUUID()
  @Field()
  userId: string;

  @IsNotEmpty()
  @Field(type => Date)
  start_date: Date;

  @IsOptional()
  @IsDate()
  @Field(type => Date)
  end_date: Date;
}
