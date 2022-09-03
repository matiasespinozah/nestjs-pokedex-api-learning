import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(id: string): string {
    if (!isValidObjectId(id))
      throw new BadRequestException(`${id} is not a valid MongoId`);

    return id;
  }
}
