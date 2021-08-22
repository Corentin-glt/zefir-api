import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { omitBy, isUndefined } from 'lodash';
import { Repository } from 'typeorm';

import { fibonacci, randomNumberFromInterval } from 'src/utils/function';

import { UserCreateDTO } from './dto/create-user.input';
import { PaginationDTO } from './dto/pagination.input';
import { Users } from './entities/users.entity';
import { AnagramsService } from 'src/anagrams/anagrams.service';
import { Anagram } from 'src/anagrams/entities/anagram.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    private anagramService: AnagramsService,
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
    if (existingUser) {
      const existingAnagram = await this.getAnagram(existingUser.id);
      if (existingAnagram) throw new Error('This user already exists');
    }

    const randomNumber = randomNumberFromInterval(50, 51);
    const newUser = this.usersRepository.create({
      email,
      fib: fibonacci(randomNumber),
    });

    const userSaved = await this.usersRepository.save(newUser);
    await this.anagramService.create({ user_id: userSaved.id });
    return userSaved;
  }

  getAnagram(userId: string): Promise<Anagram> {
    return this.anagramService.findOneByUser(userId);
  }
}
