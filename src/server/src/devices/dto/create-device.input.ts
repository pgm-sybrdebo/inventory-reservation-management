import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

@InputType()
export class CreateDeviceInput {
  @IsNotEmpty()
  @IsUUID('all')
  @Field()
  modelId: string;

  @IsNotEmpty()
  @IsUUID('all')
  @Field()
  deviceStatusId: string;

  @IsOptional()
  @IsUUID('all')
  @Field({ nullable: true })
  userId?: string;

  // Optional because you first want to create the device and then use the id to create the qr-code
  @IsOptional()
  @Field({ nullable: true })
  qr_code?: string;
}
