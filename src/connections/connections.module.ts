import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
const Shopify = require('shopify-api-node');

import config from '../config';

@Global()
@Module({
  providers: [
    {
      provide: 'SBC',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { name, apiKey, password } = configService.dev;
        const shop = new Shopify({
          shopName: name,
          apiKey,
          password,
          apiVersion: '2023-07'
        });
        
        return shop;
      },
      inject: [config.KEY]
    },
  ],
  exports: ['SBC']
})
export class ConnectionsModule {}
