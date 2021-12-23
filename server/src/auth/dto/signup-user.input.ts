import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsAlpha,
  IsString,
  IsEmail,
  IsPositive,
  IsInt,
  IsOptional,
} from 'class-validator';

@InputType()
export class SignupUserInput {
  @IsNotEmpty()
  @IsAlpha()
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
  @Field((type) => Int)
  cardNumber: number;

  @IsPositive()
  @IsInt()
  @Field((type) => Int)
  profession: number;
}
