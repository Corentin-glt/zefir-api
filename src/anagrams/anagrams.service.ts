import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAnagramInput } from './dto/create-anagram.input';
import { Anagram } from './entities/anagram.entity';

@Injectable()
export class AnagramsService {
  constructor(
    @InjectRepository(Anagram) private anagramRepository: Repository<Anagram>,
  ) {}
  create(createAnagramInput: CreateAnagramInput): Promise<Anagram> {
    //TODO: make the algo anagram here
    const anagram = this.anagramRepository.create({
      user_id: createAnagramInput.user_id,
    });

    return this.anagramRepository.save(anagram);
  }

  findOne(id: number) {
    return `This action returns a #${id} anagram`;
  }
  findOneByUser(userId: string) {
    return this.anagramRepository.findOne({ where: { user_id: userId } });
  }
}
