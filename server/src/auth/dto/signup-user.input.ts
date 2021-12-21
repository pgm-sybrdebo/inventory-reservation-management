import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty, IsAlpha, IsString, IsEmail, IsPositive, IsInt, IsOptional } from "class-validator";

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
  @Field()
  role: number;

  @IsOptional()
  @IsPositive()
  @IsInt()
  @Field(type => Int, {nullable: true})
  cardNumber?: number;
}