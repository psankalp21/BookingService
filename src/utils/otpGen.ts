import { createClient } from "redis";
import { redis } from "../database/redis";
const client = createClient();
client.on('error', err => console.log('Redis Client Error', err));
client.connect();

export async function generateOTP(key:string,exp:number) {
    const length = 6
    const characters = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      otp += characters[randomIndex];
    }
    await redis.set(key,otp,exp)
    return otp
  }