import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnagramsService } from './anagrams.service';
import { AnagramsResolver } from './anagrams.resolver';
import { Anagram } from './entities/anagram.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Anagram])],
  providers: [AnagramsResolver, AnagramsService],
  exports: [AnagramsService],
})
export class AnagramsModule {}
