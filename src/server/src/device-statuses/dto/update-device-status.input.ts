import { CreateDeviceStatusInput } from './create-device-status.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class UpdateDeviceStatusInput extends PartialType(
  CreateDeviceStatusInput,
) {
  @IsNotEmpty()
  @IsUUID('all')
  @Field()
  id: string;
}
