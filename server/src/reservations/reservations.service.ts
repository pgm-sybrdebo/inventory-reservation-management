import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReservationInput } from './dto/create-reservation.input';
import { UpdateReservationInput } from './dto/update-reservation.input';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationsService {
  constructor(@InjectRepository(Reservation) private reservationsRepository: Repository<Reservation>){}

  create(createReservationInput: CreateReservationInput):Promise<Reservation>{
    const newReservation = this.reservationsRepository.create(createReservationInput); 

    return this.reservationsRepository.save(newReservation); 
  }

  findAll():Promise<Reservation[]> {
    return this.reservationsRepository.find();
  }

  findOne(id: string):Promise<Reservation> {
    return this.reservationsRepository.findOneOrFail(id);
  }

  async update(id: string, updateUserInput: UpdateReservationInput):Promise<Reservation> {
    const updatedReservation = await this.reservationsRepository.preload({
      id: id,
      ...updateUserInput,
    });

    return this.reservationsRepository.save(updatedReservation);
  }

  async remove(id: string):Promise<Reservation> {
    const reservation = await this.findOne(id);
    return this.reservationsRepository.remove(reservation);
  }
}
