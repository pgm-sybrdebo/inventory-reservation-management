import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsAlpha, IsString, IsEmail, IsOptional } from 'class-validator';

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

  @IsAlpha()
  @Field()
  role: string;

  @IsOptional()
  @IsString()
  @Field({nullable: true})
  studentNumber?: string;

  @IsOptional()
  @IsString()
  @Field({nullable: true})
  lecturerNumber?: string;
}
