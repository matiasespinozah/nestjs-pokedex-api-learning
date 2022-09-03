import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { isValidObjectId, Model } from 'mongoose';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handlerErrorDB(error.code, error.keyValue);
    }
  }

  findAll(paginatorDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginatorDto;
    return this.pokemonModel.find().limit(limit).skip(offset).sort({ no: 1 });
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    } else if (isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    } else {
      pokemon = await this.pokemonModel.findOne({
        name: term.toLocaleLowerCase(),
      });
    }

    if (!pokemon) throw new NotFoundException('pokemon no encontrado');

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);

    try {
      if (updatePokemonDto.name)
        updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();

      await pokemon.updateOne(updatePokemonDto);
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handlerErrorDB(error.code, error.keyValue);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

    if (deletedCount === 0)
      throw new NotFoundException(`pokemon with id ${id} not found`);
  }

  async loadSeedData(pokemons: CreatePokemonDto[]) {
    try {
      const data = await this.pokemonModel.insertMany(pokemons);
      return data;
    } catch (error) {
      this.handlerErrorDB(error.code, error.keyValue);
    }
  }

  private handlerErrorDB(code: number, value: string) {
    const json = JSON.stringify(value);

    if (code === 11000) {
      console.error('pokemon existe en base de datos', json);
      throw new ConflictException(
        `Pokemon existe actualmente ${JSON.stringify(value)}`,
      );
    }

    console.error('error al guardar pokemon en base de datos', json);
    throw new InternalServerErrorException(
      'no fue posible crear el pokemon, revisar los logs',
    );
  }
}
