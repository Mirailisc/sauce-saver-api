import { Injectable } from '@nestjs/common';
import { CreateSourceInput } from './dto/create-source.input';
import { UpdateSourceInput } from './dto/update-source.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Source } from '@prisma/client';

@Injectable()
export class SourceService {
  constructor(private prisma: PrismaService) {}

  async create(createSourceInput: CreateSourceInput): Promise<Source> {
    const categories: { id: string }[] = createSourceInput.categories_id.map(
      (category) => ({
        id: category,
      }),
    );

    return this.prisma.source.create({
      data: {
        source_name: createSourceInput.source_name,
        source_number: createSourceInput.source_number,
        url: createSourceInput.url,
        createdAt: new Date(),
        categories: {
          connect: categories,
        },
      },
      include: {
        categories: true,
      },
    });
  }

  findAll() {
    return `This action returns all source`;
  }

  findOne(id: string) {
    return `This action returns a #${id} source`;
  }

  update(id: string, updateSourceInput: UpdateSourceInput) {
    return `This action updates a #${id} source`;
  }

  remove(id: string) {
    return `This action removes a #${id} source`;
  }
}
