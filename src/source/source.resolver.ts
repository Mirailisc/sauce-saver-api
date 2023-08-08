import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SourceService } from './source.service';
import { Source } from './entities/source.entity';
import { CreateSourceInput } from './dto/create-source.input';
import { UpdateSourceInput } from './dto/update-source.input';
import { Source as PrismaSource } from '@prisma/client';

@Resolver(() => Source)
export class SourceResolver {
  constructor(private readonly sourceService: SourceService) {}

  @Mutation(() => Source)
  async createSource(
    @Args('createSourceInput') createSourceInput: CreateSourceInput,
  ): Promise<PrismaSource> {
    return this.sourceService.create(createSourceInput);
  }

  @Query(() => [Source], { name: 'source' })
  findAll() {
    return this.sourceService.findAll();
  }

  @Query(() => Source, { name: 'source' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.sourceService.findOne(id);
  }

  @Mutation(() => Source)
  updateSource(
    @Args('updateSourceInput') updateSourceInput: UpdateSourceInput,
  ) {
    return this.sourceService.update(updateSourceInput.id, updateSourceInput);
  }

  @Mutation(() => Source)
  removeSource(@Args('id', { type: () => String }) id: string) {
    return this.sourceService.remove(id);
  }
}
