import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AnagramsService } from './anagrams.service';
import { Anagram } from './entities/anagram.entity';
import { CreateAnagramInput } from './dto/create-anagram.input';

@Resolver(() => Anagram)
export class AnagramsResolver {
  constructor(private readonly anagramsService: AnagramsService) {}

  @Mutation(() => Anagram)
  createAnagram(
    @Args('createAnagramInput') createAnagramInput: CreateAnagramInput,
  ) {
    return this.anagramsService.create(createAnagramInput);
  }

  @Query(() => Anagram, { name: 'anagram' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.anagramsService.findOne(id);
  }
}
