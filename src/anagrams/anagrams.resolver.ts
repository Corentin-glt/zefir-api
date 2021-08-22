import { Resolver } from '@nestjs/graphql';
import { Anagram } from './entities/anagram.entity';

@Resolver(() => Anagram)
export class AnagramsResolver {}
