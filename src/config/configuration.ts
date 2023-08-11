import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    mongo: {
      uri: process.env.MONGO_DB_URI,
    },
  },
};
