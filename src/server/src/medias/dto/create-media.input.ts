import { InputType, Int, Field } from '@nestjs/graphql';
import { IsAlpha, IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateMediaInput {
  @IsNotEmpty()
  @IsUUID('all')
  @Field()
  modelId: string;

  @IsNotEmpty()
  @IsAlpha()
  @Field()
  type: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  source: string;
}
