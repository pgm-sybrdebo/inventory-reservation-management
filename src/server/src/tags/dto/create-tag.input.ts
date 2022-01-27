import { InputType, Field } from '@nestjs/graphql';
import { IsAlpha, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateTagInput {
  @IsNotEmpty()
  @IsAlpha()
  @Field()
  name: string;
}
