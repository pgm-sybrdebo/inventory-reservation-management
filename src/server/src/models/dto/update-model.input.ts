import { CreateModelInput } from './create-model.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class UpdateModelInput extends PartialType(CreateModelInput) {
  @IsNotEmpty()
  @IsUUID('all')
  @Field()
  id: string;
}
