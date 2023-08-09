import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { CategoriesService } from './categories.service'
import { Category } from './entities/category.entity'
import { CreateCategoryInput } from './dto/create-category.input'
import { UpdateCategoryInput } from './dto/update-category.input'
import { Category as PrismaCategory } from '@prisma/client'

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Mutation(() => Category)
  async createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ): Promise<PrismaCategory> {
    return this.categoriesService.create(createCategoryInput)
  }

  @Query(() => [Category], { name: 'categories' })
  async findAll(): Promise<PrismaCategory[]> {
    return this.categoriesService.findAll()
  }

  @Query(() => Category, { name: 'category' })
  async findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<PrismaCategory> {
    return this.categoriesService.findOne(id)
  }

  @Mutation(() => Category)
  async updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ): Promise<PrismaCategory> {
    return this.categoriesService.update(
      updateCategoryInput.id,
      updateCategoryInput,
    )
  }

  @Mutation(() => Category)
  async removeCategory(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<PrismaCategory> {
    return this.categoriesService.remove(id)
  }
}
