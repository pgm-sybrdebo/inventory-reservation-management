import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsJSON,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import JSON, { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class CreateModelInput {
  @IsNotEmpty()
  @IsUUID('all')
  @Field()
  reservation_time_id: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  description: string;

  @IsNotEmpty()
  @IsPositive()
  @Min(0)
  @Max(1000)
  @Field((type) => Int)
  quantity: number;

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
}