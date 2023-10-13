import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectionModule } from './connection/connection.module';
import { CollectionsModule } from './collections/collections.module';

import { environments } from './enviroments';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
    }),
    ConnectionModule, 
    CollectionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
