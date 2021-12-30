import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsAlpha,
  IsString,
  IsEmail,
  IsPositive,
  IsInt,
  IsOptional,
  Min,
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

  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  @Field((type) => Int)
  cardNumber: number;

  @IsNotEmpty()
  @Min(0)
  @IsInt()
  @Field((type) => Int)
  profession: number;
}
