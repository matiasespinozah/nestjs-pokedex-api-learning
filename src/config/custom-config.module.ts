import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EnvConfiguration } from './app.config';
import { JoiValidationSchema } from './joi.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
  ],
})
export class CustomConfigModule {}
