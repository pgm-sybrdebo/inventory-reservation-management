import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsAlpha,
  IsString,
  IsEmail,
  IsOptional,
  IsInt,
  IsPositive,
  Min,
  Max,
} from 'class-validator';
import { CreateDateInput } from 'src/mixins/create-date.input';
import { Dates } from 'src/mixins/date.entity';

@InputType()
export class CreateUserInput {
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

  // @IsPositive()
  // @IsOptional()
  @Min(0)
  @Max(1)
  @IsInt()
  @Field((type) => Int)
  profession: number;

  // @Field()
  // date: CreateDateInput

  // @Field()
  // dateCreated_on: Date

  // @Field()
  // dateModified_on: Date

  // @Field({nullable: true})
  // dateDeleted_on: Date
}
