import { CreateSourceInput } from './create-source.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSourceInput extends PartialType(CreateSourceInput) {
  @Field(() => String)
  id: string;

  @Field()
  source_name: string;

  @Field({ nullable: true })
  source_number?: number;

  @Field()
  url: string;

  @Field(() => [String], { nullable: true })
  categories_id: string[];
}
