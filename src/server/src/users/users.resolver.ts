import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ParseIntPipe, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Reservation } from 'src/reservations/entities/reservation.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // @Mutation(() => User)
  // createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
  //   return this.usersService.create(createUserInput);
  // }

  @Query(() => [User], { name: 'users' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => [User], { name: 'usersByRole' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findAllByRole(
    @Args('role', { type: () => Int }, new ParseIntPipe()) role: number,
  ) {
    return this.usersService.findAllByRole(role);
  }

  @Query(() => [User], { name: 'usersByProfession' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findAllByProfession(
    @Args('profession', { type: () => Int }, new ParseIntPipe())
    profession: number,
  ) {
    return this.usersService.findAllByProfession(profession);
  }

  @Query(() => Int, { name: 'totalUsers' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async findTotal() {
    return this.usersService.findAndCount();
  }

  @Query(() => Int, { name: 'differenceLastMonthUsers' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async findDifferenceLastMonth() {
    return this.usersService.findDifferenceLastMonth();
  }

  @Query(() => [User], { name: 'recentUsers' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async findRecentUsers(
    @Args('from', { type: () => String }) from: string,
    @Args('to', { type: () => String }) to: string,
  ) {
    return this.usersService.findRecentUsers(from, to);
  }

  // findAll(@context() context)

  @Query(() => User, { name: 'user' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  findOne(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.findOne(id);
  }

  @Query(() => User, { name: 'userByEmail' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  findOneByEmail(@Args('email', { type: () => String }) email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  removeUser(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.remove(id);
  }

  @ResolveField((returns) => [Reservation])
  reservations(@Parent() user: User): Promise<Reservation[]> {
    return this.usersService.getReservationsByUserId(user.id);
  }
}
