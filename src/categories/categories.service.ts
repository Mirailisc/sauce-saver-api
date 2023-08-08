import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Category as PrismaCategory } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(
    createCategoryInput: CreateCategoryInput,
  ): Promise<PrismaCategory> {
    const data = await this.prisma.category.findMany({
      where: { category_name: createCategoryInput.category_name },
    });

    if (data.length > 0) {
      throw new HttpException('Category is exists', HttpStatus.CONFLICT);
    }

    return this.prisma.category.create({ data: createCategoryInput });
  }

  async findAll(): Promise<PrismaCategory[]> {
    return this.prisma.category.findMany({ include: { sources: true } });
  }

  findOne(id: number): Promise<PrismaCategory> {
    return this.prisma.category.findUnique({
      where: { id },
    });
  }

  update(
    id: number,
    updateCategoryInput: UpdateCategoryInput,
  ): Promise<PrismaCategory> {
    return this.prisma.category.update({
      where: { id },
      data: {
        category_name: updateCategoryInput.category_name,
      },
    });
  }

  remove(id: number): Promise<PrismaCategory> {
    return this.prisma.category.delete({ where: { id } });
  }
}
