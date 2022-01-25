import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateDateInput {
  @Field({ nullable: true })
  dateCreated_on?: Date;

  @Field({ nullable: true })
  dateModified_on?: Date;

  @Field({ nullable: true })
  dateDeleted_on?: Date;
}
