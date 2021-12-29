import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateDeviceStatusInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;
}
