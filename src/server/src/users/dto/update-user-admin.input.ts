import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsAlphanumeric, IsInt, IsNotEmpty, IsPositive, IsString, IsUUID, Max, Min } from 'class-validator';

@InputType()
export class UpdateUserAdminInput extends PartialType(CreateUserInput) {
  @IsNotEmpty()
  @IsUUID('all')
  @Field()
  id: string;

  @Min(0)
  @Max(1)
  @IsInt()
  @Field((type) => Int)
  role: number;

}
