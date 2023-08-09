import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateCategoryInput {
  @Field()
  category_name: string
}
