import { CreateTagInput } from './create-tag.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class UpdateTagInput extends PartialType(CreateTagInput) {
  @IsNotEmpty()
  @IsUUID('all')
  @Field()
  id: string;
}
