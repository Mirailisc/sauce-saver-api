import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoriesService } from './categories/categories.service';
import { Categories } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('categories')
  async getCategories(): Promise<Categories[]> {
    return this.categoriesService.categories();
  }

  @Post('categories/create')
  createCategory(
    @Body() categoryData: { category_name: string },
  ): Promise<Categories> {
    return this.categoriesService.createCategory(categoryData);
  }

  @Delete('categories/delete?id=:id')
  deleteCategory(@Param('id') id: string): Promise<Categories> {
    return this.categoriesService.deleteCategory({ id });
  }
}
