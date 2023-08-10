import { Resolver, Query, Args, Int } from '@nestjs/graphql'
import { CategorySource } from './entities/category-source.entity'
import { CategoryOnSource } from '@prisma/client'
import { CategorySourceService } from './category-source.service'

@Resolver(() => CategorySource)
export class CategorySourceResolver {
  constructor(private readonly categorySourceService: CategorySourceService) {}

  @Query(() => [CategorySource], { name: 'categoryWithSource' })
  async findAll(): Promise<CategoryOnSource[]> {
    return this.categorySourceService.findAll()
  }

  @Query(() => [CategorySource], { name: 'categoriesFromSource' })
  async findCategoriesFromSource(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<{ sourceId: number; categoryId: number; createdAt: Date }[]> {
    return await this.categorySourceService.findCategoriesFromSource(id)
  }
}
