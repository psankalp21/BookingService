import { createClient } from "redis";

const client = createClient();
client.on('error', err => console.log('Redis Client Error', err));
client.connect();

export class redis {
    static async set(key: string, value: string, ttl: number): Promise<void> {
        await client.set(key, value);
        if (ttl > 1)
            await client.expire(key, ttl);
        return
    }

    static async get(key: string): Promise<string> {
        return await client.get(key);
    }

    static async ttl(key: string): Promise<number> {
        return await client.ttl(key);
    }

}