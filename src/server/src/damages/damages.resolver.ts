import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DamagesService } from './damages.service';
import { Damage } from './entities/damage.entity';
import { CreateDamageInput } from './dto/create-damage.input';
import { UpdateDamageInput } from './dto/update-damage.input';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/role.enum';

@Resolver(() => Damage)
export class DamagesResolver {
  constructor(private readonly damagesService: DamagesService) {}

  @Mutation(() => Damage)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  createDamage(
    @Args('createDamageInput') createDamageInput: CreateDamageInput,
  ) {
    return this.damagesService.create(createDamageInput);
  }

  @Query(() => [Damage], { name: 'damages' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findAll() {
    return this.damagesService.findAll();
  }

  @Query(() => Damage, { name: 'damage' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findOne(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.damagesService.findOne(id);
  }

  @Mutation(() => Damage)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  updateDamage(
    @Args('updateDamageInput') updateDamageInput: UpdateDamageInput,
  ) {
    return this.damagesService.update(updateDamageInput.id, updateDamageInput);
  }

  @Mutation(() => Damage)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  removeDamage(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.damagesService.remove(id);
  }

  @Mutation(() => Damage)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  softRemoveDamage(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.damagesService.softRemove(id);
  }
}
