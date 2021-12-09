import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>){}

  create(createUserInput: CreateUserInput):Promise<User> {
    const newUser = this.usersRepository.create(createUserInput); 

    return this.usersRepository.save(newUser); 
  }

  findAll():Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ email });
  }

  findOne(id: number):Promise<User> {
    return this.usersRepository.findOneOrFail(id);
  }

  async update(id: number, updateUserInput: UpdateUserInput):Promise<User> {
    const updatedUser = await this.usersRepository.preload({
      id: id,
      ...updateUserInput,
    });

    return this.usersRepository.save(updatedUser);
  }

  async remove(id: number):Promise<User> {
    const user = await this.findOne(id);
    return this.usersRepository.remove(user);
  }
}
