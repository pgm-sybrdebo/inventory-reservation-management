import { CreateDamageInput } from './create-damage.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class UpdateDamageInput extends PartialType(CreateDamageInput) {
  @IsNotEmpty()
  @IsUUID('all')
  @Field()
  id: string;
}
