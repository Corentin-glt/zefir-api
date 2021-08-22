import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { omitBy, isUndefined } from 'lodash';
import { Repository } from 'typeorm';

import { fibonacci, randomNumberFromInterval } from 'src/utils/function';

import { UserCreateDTO } from './dto/create-user.input';
import { PaginationDTO } from './dto/pagination.input';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async find(pagination: PaginationDTO): Promise<Users[]> {
    const query = omitBy(
      {
        order: {
          id: 'ASC',
        },
        skip: pagination.offset,
        take: pagination.limit,
      },
      isUndefined,
    );

    return this.usersRepository.find(query);
  }

  count() {
    return this.usersRepository.count();
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
