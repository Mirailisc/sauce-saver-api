import { InputType, Field, Int } from '@nestjs/graphql'

@InputType()
export class CreateSourceInput {
  @Field()
  source_name: string

  @Field(() => Int, { nullable: true })
  source_number?: number

  @Field()
  url: string

  @Field(() => [Int], { nullable: false })
  categories_id: number[]
}
