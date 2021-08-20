import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { fibonacci, randomNumberFromInterval } from 'src/utils/function';
import { Repository } from 'typeorm';
import { UserCreateDTO } from './dto/create-user.input';

import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  find(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async create(user: UserCreateDTO): Promise<Users> {
    const { email } = user;

    const isEmailValid = email.split('@')[1].includes('zefir.fr');
    if (!isEmailValid) {
      throw new Error('Email invalid');
    }

    const existingUser = await this.usersRepository.findOne({ email });

    //TODO: check associated Map (anagram)
    if (existingUser) {
      throw new Error('This user already exists');
    }

    const randomNumber = randomNumberFromInterval(50, 51);
    const newUser = this.usersRepository.create({
      email,
      fib: fibonacci(randomNumber),
    });

    return this.usersRepository.save(newUser);
  }
}
