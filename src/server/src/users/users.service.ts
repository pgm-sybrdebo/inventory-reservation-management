import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { ReservationsService } from 'src/reservations/reservations.service';
import { Repository, Between, LessThanOrEqual, Like, Raw } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { raw } from 'express';

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
    return this.usersRepository.find({
      order: {
        id: 'ASC'
      }
    });
  }

  findAllByPagination(offset: number, limit: number): Promise<User[]> {
    return this.usersRepository.find({
      skip: offset,
      take: limit,
      order: {
        id: 'ASC',
      },
    });
  }

  findAllByLastName(lastName: string): Promise<User[]> {
    return this.usersRepository.find({
      where: {
        lastName: Raw(alias => `LOWER(${alias}) Like '${lastName}%'`)
      }
    });
  }

  findAllByLastNameWithPagination(lastName: string, offset: number, limit: number): Promise<User[]> {
    return this.usersRepository.find({
      where: {
        lastName: Raw(alias => `LOWER(${alias}) Like '${lastName}%'`)
      },
      skip: offset,
      take: limit,
      order: {
        id: 'ASC',
      },
    });
  }

  async findAllByLastNameAndRoleWithPagination(role: number, lastName: string, offset: number, limit: number): Promise<User[]> {
    const rawData = await this.usersRepository.find({
      where: {
        lastName: Raw(alias => `LOWER(${alias}) Like '${lastName.toLowerCase()}%'`),
        role: Raw(a => `${a} = '${role}'`)
      },
      skip: offset,
      take: limit,
      order: {
        id: 'ASC',
      },
    });
    return rawData;
  
  }

  findAllByLastNameAndProfessionWithPagination(profession: number, lastName: string, offset: number, limit: number): Promise<User[]> {
    return this.usersRepository.find({
      where: {
        lastName: Raw(alias => `LOWER(${alias}) Like '${lastName.toLowerCase()}%'`),
        profession: profession
      },
      skip: offset,
      take: limit,
      order: {
        id: 'ASC',
      },
    });
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

  async countWithLastName(lastName: string): Promise<number> {
    const rawData = await this.usersRepository.query(`
    SELECT
      COUNT(DISTINCT id) AS total
    FROM
      "user"
    WHERE "deleted_on" IS NULL
    AND LOWER("lastName") LIKE LOWER('${lastName}%')
    `);
    return rawData[0].total;
  }

  async countWithLastNameAndRole(lastName: string, role: number): Promise<number> {
    const rawData = await this.usersRepository.query(`
    SELECT
      COUNT(DISTINCT id) AS total
    FROM
      "user"
    WHERE "deleted_on" IS NULL
    AND "role" = '${role}'
    AND LOWER("lastName") LIKE LOWER('${lastName}%')
    `);
    return rawData[0].total;
  }

  async countWithLastNameAndProfession(lastName: string, profession: number): Promise<number> {
    const rawData = await this.usersRepository.query(`
    SELECT
      COUNT(DISTINCT id) AS total
    FROM
      "user"
    WHERE "deleted_on" IS NULL
    AND "profession" = ${profession}
    AND LOWER("lastName") LIKE LOWER('${lastName}%')
    `);
    return rawData[0].total;
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
    //console.log(date);
    //console.log(date1);
    //console.log(iso);
    //console.log(iso1);

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
      //console.log(updateUserInput.password);
      const hashPassword = await bcrypt.hash(updateUserInput.password, 10);
      //console.log('hash', hashPassword);
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
