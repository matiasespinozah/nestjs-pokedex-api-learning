import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';

import { CustomConfigModule } from './config/custom-config.module';

@Module({
  imports: [
    CustomConfigModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(process.env.MONGODB),
    CommonModule,
    PokemonModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
