import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    dev: {
      name: process.env.DEV_SHOP_NAME,
      apiKey: process.env.DEV_API_KEY,
      password: process.env.DEV_PASSSWORD
    },
    mercurio: {
      name: process.env.MERCURIO_SHOP_NAME,
      apiKey: process.env.MERCURIO_API_KEY,
      password: process.env.MERCURIO_PASSSWORD
    }
  };
});
