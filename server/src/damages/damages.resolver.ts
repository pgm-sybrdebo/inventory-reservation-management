import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DamagesService } from './damages.service';
import { Damage } from './entities/damage.entity';
import { CreateDamageInput } from './dto/create-damage.input';
import { UpdateDamageInput } from './dto/update-damage.input';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => Damage)
export class DamagesResolver {
  constructor(private readonly damagesService: DamagesService) {}

  @Mutation(() => Damage)
  createDamage(@Args('createDamageInput') createDamageInput: CreateDamageInput) {
    return this.damagesService.create(createDamageInput);
  }

  @Query(() => [Damage], { name: 'damages' })
  findAll() {
    return this.damagesService.findAll();
  }

  @Query(() => Damage, { name: 'damage' })
  findOne(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.damagesService.findOne(id);
  }

  @Mutation(() => Damage)
  updateDamage(@Args('updateDamageInput') updateDamageInput: UpdateDamageInput) {
    return this.damagesService.update(updateDamageInput.id, updateDamageInput);
  }

  @Mutation(() => Damage)
  removeDamage(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.damagesService.remove(id);
  }
}
