import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDamageInput } from './dto/create-damage.input';
import { UpdateDamageInput } from './dto/update-damage.input';
import { Damage } from './entities/damage.entity';

@Injectable()
export class DamagesService {
  constructor(
    @InjectRepository(Damage) private damagesRepository: Repository<Damage>,
  ) {}

  create(createDamageInput: CreateDamageInput): Promise<Damage> {
    const newDamage = this.damagesRepository.create(createDamageInput);

    return this.damagesRepository.save(newDamage);
  }

  findAll(): Promise<Damage[]> {
    return this.damagesRepository.find();
  }

  findOne(id: string): Promise<Damage> {
    return this.damagesRepository.findOneOrFail(id);
  }

  findAllByDeviceId(deviceId: string): Promise<Damage[]> {
    return this.damagesRepository.find({ deviceId });
  }

  async update(
    id: string,
    updateDamageInput: UpdateDamageInput,
  ): Promise<Damage> {
    const updatedDamage = await this.damagesRepository.preload({
      id: id,
      ...updateDamageInput,
    });

    return this.damagesRepository.save(updatedDamage);
  }

  async remove(id: string): Promise<Damage> {
    const damage = await this.findOne(id);
    return this.damagesRepository.remove(damage);
  }

  async softRemove(id: string): Promise<Damage> {
    const damage = await this.findOne(id);
    return this.damagesRepository.softRemove(damage);
  }
}
