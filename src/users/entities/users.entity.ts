import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

import { Anagram } from 'src/anagrams/entities/anagram.entity';

@ObjectType()
@Entity()
export class Users {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column({ type: 'bigint' })
  fib: number;

  @OneToOne(() => Anagram, (anagram) => anagram.user)
  @Field(() => Anagram)
  anagram: Anagram;
}
