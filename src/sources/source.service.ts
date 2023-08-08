import { Injectable } from '@nestjs/common';
import { CreateSourceInput } from './dto/create-source.input';
import { UpdateSourceInput } from './dto/update-source.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Category, Source } from '@prisma/client';

@Injectable()
export class SourceService {
  constructor(private prisma: PrismaService) {}

  async create(createSourceInput: CreateSourceInput): Promise<Source> {
    const categories = [];
    await Promise.all(
      createSourceInput.categories_id.map(async (id: number) => {
        const res = await this.prisma.category.findUnique({ where: { id } });
        categories.push(res);
      }),
    );

    console.log(categories);

    const sourceData = await this.prisma.source.create({
      data: {
        source_name: createSourceInput.source_name,
        source_number: createSourceInput.source_number,
        url: createSourceInput.url,
        createdAt: new Date(),
      },
    });

    await Promise.all(
      categories.map(async (category: Category) => {
        await this.prisma.categoryOnSource.create({
          data: {
            categoryId: category.id,
            sourceId: sourceData.id,
          },
          include: {
            category: true,
            source: true,
          },
        });
      }),
    );

    return sourceData;
  }

  findAll() {
    return `This action returns all source`;
  }

  findOne(id: number) {
    return `This action returns a #${id} source`;
  }

  update(id: number, updateSourceInput: UpdateSourceInput) {
    return `This action updates a #${id} source`;
  }

  remove(id: number) {
    return `This action removes a #${id} source`;
  }
}
