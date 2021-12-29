import { CreateMediaInput } from './create-media.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class UpdateMediaInput extends PartialType(CreateMediaInput) {
  @IsNotEmpty()
  @IsUUID('all')
  @Field()
  id: string;
}
