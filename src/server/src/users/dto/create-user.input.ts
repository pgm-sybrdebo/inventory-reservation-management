import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsInt,
  IsPositive,
  Min,
  Max,
} from 'class-validator';


@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  password: string;

  @IsPositive()
  @IsInt()
  @Min(10000)
  @Max(99999)
  @Field((type) => Int)
  cardNumber: number;

  @IsNotEmpty()
  @Min(0)
  @Max(1)
  @IsInt()
  @Field((type) => Int)
  profession: number;
}
