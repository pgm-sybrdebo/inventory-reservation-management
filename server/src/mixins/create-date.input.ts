import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsAlpha, IsString, IsEmail, IsOptional, IsInt, IsPositive } from 'class-validator';

@InputType()
export class CreateDateInput {
  @Field({nullable: true})
  dateCreated_on?: Date

  @Field({nullable: true})
  dateModified_on?: Date

  @Field({nullable: true})
  dateDeleted_on?: Date
}
