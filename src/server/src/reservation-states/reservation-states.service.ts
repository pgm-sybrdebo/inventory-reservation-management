import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReservationStateInput } from './dto/create-reservation-state.input';
import { UpdateReservationStateInput } from './dto/update-reservation-state.input';
import { ReservationState } from './entities/reservation-state.entity';

@Injectable()
export class ReservationStatesService {
  constructor(
    @InjectRepository(ReservationState)
    private reservationStatesRepository: Repository<ReservationState>,
  ) {}

  create(
    createReservationStateInput: CreateReservationStateInput,
  ): Promise<ReservationState> {
    const newReservationState = this.reservationStatesRepository.create(
      createReservationStateInput,
    );

    return this.reservationStatesRepository.save(newReservationState);
  }

  findAll(): Promise<ReservationState[]> {
    return this.reservationStatesRepository.find();
  }

  findOne(id: string): Promise<ReservationState> {
    return this.reservationStatesRepository.findOneOrFail(id);
  }

  async update(
    id: string,
    updateReservationStateInput: UpdateReservationStateInput,
  ): Promise<ReservationState> {
    const updatedReservationState =
      await this.reservationStatesRepository.preload({
        id: id,
        ...updateReservationStateInput,
      });

    return this.reservationStatesRepository.save(updatedReservationState);
  }

  async remove(id: string): Promise<ReservationState> {
    const reservationState = await this.findOne(id);
    return this.reservationStatesRepository.remove(reservationState);
  }

  async softRemove(id: string): Promise<ReservationState> {
    const reservationState = await this.findOne(id);
    return this.reservationStatesRepository.softRemove(reservationState);
  }
}
