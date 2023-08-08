import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSourceInput {
  @Field()
  source_name: string;

  @Field({ nullable: true })
  source_number?: number;

  @Field()
  url: string;

  @Field(() => [String], { nullable: false })
  categories_id: string[];
}
