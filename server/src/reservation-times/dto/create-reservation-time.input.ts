import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsPositive, IsString, Max, Min } from 'class-validator';

@InputType()
export class CreateReservationTimeInput {
  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  @Max(365)
  @Field((type) => Int)
  amount: number;

  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;
}
