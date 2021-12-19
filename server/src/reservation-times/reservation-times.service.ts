import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReservationTimeInput } from './dto/create-reservation-time.input';
import { UpdateReservationTimeInput } from './dto/update-reservation-time.input';
import { ReservationTime } from './entities/reservation-time.entity';

@Injectable()
export class ReservationTimesService {
  constructor(@InjectRepository(ReservationTime) private reservationTimesRepository: Repository<ReservationTime>){}

  create(createReservationTimeInput: CreateReservationTimeInput):Promise<ReservationTime> {
    const newReservationTime = this.reservationTimesRepository.create(createReservationTimeInput); 

    return this.reservationTimesRepository.save(newReservationTime); 
  }

  findAll():Promise<ReservationTime[]> {
    return this.reservationTimesRepository.find();
  }

  findOne(id: string):Promise<ReservationTime> {
    return this.reservationTimesRepository.findOneOrFail(id);
  }

  async update(id: string, updateReservationTimeInput: UpdateReservationTimeInput):Promise<ReservationTime> {
    const updatedReservationTime = await this.reservationTimesRepository.preload({
      id: id,
      ...updateReservationTimeInput,
    });

    return this.reservationTimesRepository.save(updatedReservationTime);
  }

  async remove(id: string):Promise<ReservationTime> {
    const reservationTime = await this.findOne(id);
    return this.reservationTimesRepository.remove(reservationTime);
  }
}
