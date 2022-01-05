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
  userId: string;

  // @IsNotEmpty()
  // @IsBoolean()
  // @Field((type) => Boolean)
  // is_available: boolean;

  @IsNotEmpty()
  @Field()
  qr_code: string;
}
