import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class CreateDeviceInput {
  @IsNotEmpty()
  @IsUUID('all')
  @Field()
  model_id: string;

  @IsNotEmpty()
  @IsUUID('all')
  @Field()
  device_status_id: string;

  @IsNotEmpty()
  @IsBoolean()
  @Field((type) => Boolean)
  is_available: boolean;

  @IsNotEmpty()
  @Field()
  qr_code: string;
}
