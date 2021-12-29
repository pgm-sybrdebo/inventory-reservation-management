import { CreateDeviceInput } from './create-device.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class UpdateDeviceInput extends PartialType(CreateDeviceInput) {
  @IsNotEmpty()
  @IsUUID('all')
  @Field()
  id: string;
}
