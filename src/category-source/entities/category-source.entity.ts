import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Source } from 'src/sources/entities/source.entity'
import { Category } from 'src/categories/entities/category.entity'
import {
  Source as PrismaSource,
  Category as PrismaCategory,
} from '@prisma/client'

@ObjectType()
export class CategorySource {
  @Field(() => Int)
  sourceId: number

  @Field(() => Source)
  source: PrismaSource

  @Field(() => Int)
  categoryId: number

  @Field(() => Category)
  category: PrismaCategory

  @Field(() => Date)
  createAt: Date
}
