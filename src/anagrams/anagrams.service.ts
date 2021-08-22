import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { writeAnagramsFile } from 'src/utils/function';
import { Repository } from 'typeorm';

import { CreateAnagramInput } from './dto/create-anagram.input';
import { Anagram } from './entities/anagram.entity';

@Injectable()
export class AnagramsService {
  constructor(
    @InjectRepository(Anagram) private anagramRepository: Repository<Anagram>,
  ) {}

  async create(createAnagramInput: CreateAnagramInput): Promise<Anagram> {
    // return new Promise((resolve, reject) => {
    //   writeAnagramsFile(60, `${createAnagramInput.user_id}.txt`, resolve);
    // }).then(() => {
    // });
    const anagram = this.anagramRepository.create({
      user_id: createAnagramInput.user_id,
    });

    return this.anagramRepository.save(anagram);
  }

  findOneByUser(userId: string) {
    return this.anagramRepository.findOne({ where: { user_id: userId } });
  }
}
