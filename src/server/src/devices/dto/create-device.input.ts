import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

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

  @IsOptional()
  @Field({nullable: true})
  qr_code?: string;
}
