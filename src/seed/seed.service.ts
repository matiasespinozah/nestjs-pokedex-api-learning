import { Injectable } from '@nestjs/common';

import { PokeResponse } from './interfaces/poke-response.interface';
import { CreatePokemonDto } from '../pokemon/dto/create-pokemon.dto';

import { PokemonService } from '../pokemon/pokemon.service';
import { AxiosAdapter } from '../common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly http: AxiosAdapter,
  ) {}

  async execute() {
    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    const pokemons: CreatePokemonDto[] = data.results.map(({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments.at(-2);
      return { name, no };
    });

    this.pokemonService.loadSeedData(pokemons);
    return 'Seed executed';
  }
}
