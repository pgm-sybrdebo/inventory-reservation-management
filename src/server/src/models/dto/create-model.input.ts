import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsInt,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import JSON, { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class CreateModelInput {
  // @IsNotEmpty()
  // @IsUUID('all')
  // @Field()
  // reservation_time_id: string;

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

   // @IsPositive()
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

  // @IsNotEmpty()
  // @IsJSON()
  // @Field(type => GraphQLJSONObject)
  // specifications: JSON;

  @IsNotEmpty()
  @Field()
  specifications: string;

  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  @Max(1000)
  @Field((type) => Int)
  max_reservation_time: number;
}
