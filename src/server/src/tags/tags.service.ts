import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private tagsRepository: Repository<Tag>) {}

  create(createTagInput: CreateTagInput): Promise<Tag> {
    const newTag = this.tagsRepository.create(createTagInput);

    return this.tagsRepository.save(newTag);
  }

  async countWithName(name: string): Promise<number> {
    const rawData = await this.tagsRepository.query(`
    SELECT
      COUNT(DISTINCT id) AS total
    FROM
      "tag"
    WHERE "deleted_on" IS NULL
    AND LOWER("name") LIKE LOWER('${name}%')
    `);
    return rawData[0].total;
  }

  findAll(): Promise<Tag[]> {
    return this.tagsRepository.find();
  }

  findAllByNameWithPagination(
    name: string,
    offset: number,
    limit: number,
  ): Promise<Tag[]> {
    return this.tagsRepository.find({
      where: {
        name: Raw((alias) => `LOWER(${alias}) Like '${name}%'`),
      },
      skip: offset,
      take: limit,
      order: {
        id: 'ASC',
      },
    });
  }

  findOne(id: string): Promise<Tag> {
    return this.tagsRepository.findOneOrFail(id);
  }

  async update(id: string, updateTagInput: UpdateTagInput): Promise<Tag> {
    const updatedTag = await this.tagsRepository.preload({
      id: id,
      ...updateTagInput,
    });

    return this.tagsRepository.save(updatedTag);
  }

  async remove(id: string): Promise<Tag> {
    const tag = await this.findOne(id);
    return this.tagsRepository.remove(tag);
  }

  async softRemove(id: string): Promise<Tag> {
    const tag = await this.findOne(id);
    return this.tagsRepository.softRemove(tag);
  }
}
