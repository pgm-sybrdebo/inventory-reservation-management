import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreateReservationInput } from './dto/create-reservation.input';
import { UpdateReservationInput } from './dto/update-reservation.input';
import { Reservation } from './entities/reservation.entity';
import moment from 'moment';
import { DevicesService } from 'src/devices/devices.service';
import { Device } from 'src/devices/entities/device.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationsRepository: Repository<Reservation>,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    @Inject(forwardRef(() => DevicesService))
    private devicesService: DevicesService,
  ) {}

  create(createReservationInput: CreateReservationInput): Promise<Reservation> {
    const newReservation = this.reservationsRepository.create(
      createReservationInput,
    );

    return this.reservationsRepository.save(newReservation);
  }

  findAll(): Promise<Reservation[]> {
    return this.reservationsRepository.find();
  }

  findRecentReservations(): Promise<Reservation[]> {
    return this.reservationsRepository.find({
      order: {
        created_on: 'DESC',
      },
      take: 8,
    });
  }

  findAllByDeviceId(deviceId: string): Promise<Reservation[]> {
    return this.reservationsRepository.find({ deviceId });
  }

  findAllByUserId(userId: string): Promise<Reservation[]> {
    return this.reservationsRepository.find({ userId });
  }

  findAllByUSerIdAndReservationState(
    userId: string,
    reservationStateId: string,
  ): Promise<Reservation[]> {
    return this.reservationsRepository.find({ userId, reservationStateId });
  }

  findTotalMonthReservations(month: string): Promise<number> {
    const startDate = moment(month).startOf('month').toISOString();
    const endDate = moment(month).endOf('month').toISOString();
    //console.log(startDate);
    //console.log(endDate);

    return this.reservationsRepository.count({
      start_date: Between(startDate, endDate),
    });
  }

  async reservationsOverview(today: string): Promise<any> {
    const rawData = await this.reservationsRepository.query(`
      SELECT
        DATE_TRUNC('month', start_date) AS month,
        COUNT(id) AS total_reservations
      FROM
        reservation
      WHERE start_date < '${today}'
      GROUP BY
        DATE_TRUNC('month', reservation.start_date)
      ORDER BY 
        month DESC
      LIMIT 12
    `);
    //console.log(rawData);
    return rawData;
  }

  findOne(id: string): Promise<Reservation> {
    return this.reservationsRepository.findOneOrFail(id);
  }

  async update(
    id: string,
    updateReservationInput: UpdateReservationInput,
  ): Promise<Reservation> {
    const updatedReservation = await this.reservationsRepository.preload({
      id: id,
      ...updateReservationInput,
    });

    return this.reservationsRepository.save(updatedReservation);
  }

  async updateTakenConfirmed(
    id: string,
    updateReservationInput: UpdateReservationInput,
  ): Promise<Reservation> {
    const updatedReservation = await this.reservationsRepository.preload({
      id: id,
      reservationStateId: '1d6e3e78-024e-4bed-bc5e-065b6fb7d1c4',
      ...updateReservationInput,
    });

    return this.reservationsRepository.save(updatedReservation);
  }

  async remove(id: string): Promise<Reservation> {
    const reservation = await this.findOne(id);
    //console.log(reservation);
    return this.reservationsRepository.remove(reservation);
    // return reservation
  }

  async softRemove(id: string): Promise<Reservation> {
    const reservation = await this.findOne(id);
    //console.log(reservation);
    return this.reservationsRepository.softRemove(reservation);
  }

  getReservationByDeviceId(deviceId: string): Promise<Device> {
    return this.devicesService.findOne(deviceId);
  }

  getReservationByUserId(userId: string): Promise<User> {
    return this.usersService.findOne(userId);
  }
}
