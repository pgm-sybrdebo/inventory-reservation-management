import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsAlpha, IsString, IsEmail, IsOptional, IsInt, IsPositive } from 'class-validator';
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

  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  @Field()
  role: number;

  @IsOptional()
  @IsPositive()
  @IsInt()
  @Field(type => Int, {nullable: true})
  studentNumber?: number;

  @IsOptional()
  @IsPositive()
  @IsInt()
  @Field(type => Int, {nullable: true})
  lecturerNumber?: number;

  // @Field()
  // date: CreateDateInput

  // @Field()
  // dateCreated_on: Date

  // @Field()
  // dateModified_on: Date

  // @Field({nullable: true})
  // dateDeleted_on: Date
}
