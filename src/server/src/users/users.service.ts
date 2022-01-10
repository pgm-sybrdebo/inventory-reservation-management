import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { ReservationsService } from 'src/reservations/reservations.service';
import { Repository, Between, LessThanOrEqual } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @Inject(forwardRef(() => ReservationsService))
    private reservationsService: ReservationsService,
  ) {}

  create(createUserInput: CreateUserInput): Promise<User> {
    const newUser = this.usersRepository.create(createUserInput);

    return this.usersRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findAllByRole(role: number): Promise<User[]> {
    return this.usersRepository.find({ role });
  }

  findAllByProfession(profession: number): Promise<User[]> {
    return this.usersRepository.find({ profession });
  }

  findAndCount(): Promise<number> {
    return this.usersRepository.count();
  }

  async findDifferenceLastMonth(): Promise<number> {
    const date = new Date();
    const iso = date.toISOString();
    const previousMonth = new Date();
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    const previousIso = previousMonth.toISOString();
    const totalUsersLastMonth = await this.usersRepository.count({
      created_on: LessThanOrEqual(previousIso),
    });
    const totalUsersNow = await this.usersRepository.count();
    const difference = totalUsersNow - totalUsersLastMonth;
    return difference;
  }

  findRecentUsers(from: string, to: string): Promise<User[]> {
    const date = new Date(Number(from));
    const iso = date.toISOString();
    const date1 = new Date(Number(to));
    const iso1 = date1.toISOString();
    console.log(date);
    console.log(date1);
    console.log(iso);
    console.log(iso1);

    return this.usersRepository.find({
      created_on: Between(iso, iso1),
    });
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOneOrFail(id);
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ email });
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    let updatedUser;
    if (updateUserInput.password) {
      console.log(updateUserInput.password);
      const hashPassword = await bcrypt.hash(updateUserInput.password, 10);
      console.log('hash', hashPassword);
      updatedUser = await this.usersRepository.preload({
        id: id,
        ...updateUserInput,
        password: hashPassword,
      });
    } else {
      updatedUser = await this.usersRepository.preload({
        id: id,
        ...updateUserInput,
      });
    }

    return this.usersRepository.save(updatedUser);
  }

  async remove(id: string): Promise<User> {
    const user = await this.findOne(id);
    return this.usersRepository.remove(user);
  }

  async softRemove(id: string): Promise<User> {
    const user = await this.findOne(id);
    return this.usersRepository.softRemove(user);
  }

  getReservationsByUserId(userId: string): Promise<Reservation[]> {
    return this.reservationsService.findAllByUserId(userId);
  }
}
