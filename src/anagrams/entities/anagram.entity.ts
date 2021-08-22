import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

import { Users } from 'src/users/entities/users.entity';

export interface AnagramMap {
  [key: string]: number;
}

@ObjectType()
@Entity()
export class Anagram {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  user_id: string;

  @OneToOne(() => Users, (user) => user.anagram)
  @Field(() => Users)
  user: Users;

  // @Field()
  // @Column({
  //   type: 'jsonb',
  // })
  // anagram_map: AnagramMap;
}
