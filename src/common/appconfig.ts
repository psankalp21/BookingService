import * as dotenv from "dotenv";
dotenv.config({});

export let appConfig = {
  env: {
    PORT : process.env.PORT,
    MONGODB_URI : process.env.MONGODB_URI,
    EMAIL_USER : process.env.EMAIL_USER,
    EMAIL_PASSWORD : process.env.EMAIL_PASSWORD,
    SECRET_KEY : process.env.SECRET_KEY,
    ENCRYPTION_KEY : process.env.ENCRYPTION_KEY
  }
};


