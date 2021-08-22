import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { UsersModule } from './users/users.module';
import { AnagramsModule } from './anagrams/anagrams.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.URL_DATABASE,
      database: 'zefir',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    AnagramsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
