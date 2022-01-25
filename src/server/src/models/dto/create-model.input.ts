import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';
@InputType()
export class CreateModelInput {

  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  description: string;

  @IsNotEmpty()
  @Min(0)
  @Max(1000)
  @IsInt()
  @Field((type) => Int)
  quantity: number;

  @IsOptional()
  @Min(0)
  @Max(1000)
  @IsInt()
  @Field((type) => Int)
  readyQuantity: number;

  @IsNotEmpty()
  @IsString()
  @Field()
  brand: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  specifications: string;

  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  @Max(1000)
  @Field((type) => Int)
  max_reservation_time: number;
}
