import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Categories } from '@prisma/client';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Mutation(() => Category)
  async createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ): Promise<Categories> {
    return this.categoriesService.create(createCategoryInput);
  }

  @Query(() => [Category], { name: 'categories' })
  async findAll(): Promise<Categories[]> {
    return this.categoriesService.findAll();
  }

  @Query(() => Category, { name: 'category' })
  async findOne(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Categories> {
    return this.categoriesService.findOne(id);
  }

  @Mutation(() => Category)
  async updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ): Promise<Categories> {
    return this.categoriesService.update(
      updateCategoryInput.id,
      updateCategoryInput,
    );
  }

  @Mutation(() => Category)
  async removeCategory(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Categories> {
    return this.categoriesService.remove(id);
  }
}
