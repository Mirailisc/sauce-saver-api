import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Categories } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryInput: CreateCategoryInput): Promise<Categories> {
    const data = await this.prisma.categories.findMany({
      where: { category_name: createCategoryInput.category_name },
    });

    if (data.length > 0) {
      throw new HttpException('Category is exists', HttpStatus.CONFLICT);
    }

    return this.prisma.categories.create({ data: createCategoryInput });
  }

  async findAll(): Promise<Categories[]> {
    return this.prisma.categories.findMany();
  }

  findOne(id: string): Promise<Categories> {
    return this.prisma.categories.findUnique({
      where: { id },
    });
  }

  update(
    id: string,
    updateCategoryInput: UpdateCategoryInput,
  ): Promise<Categories> {
    return this.prisma.categories.update({
      where: { id },
      data: {
        category_name: updateCategoryInput.category_name,
      },
    });
  }

  remove(id: string): Promise<Categories> {
    return this.prisma.categories.delete({ where: { id } });
  }
}
