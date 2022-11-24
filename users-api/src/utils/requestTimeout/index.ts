import { createClient } from "redis";

const redisHost = process.env.REDIS_HOST || "localhost";
const redisMaster = process.env.REDIS_MASTER || "localhost";

const client = createClient({
  socket: { host: redisHost },
  password: "users-api-redis",
});

const master = createClient({
  socket: { host: redisMaster },
  password: "users-api-redis",
});

(async () => {
  client.on("connect", () => console.log("Connected to redis server."));
  client.on("error", (err) => console.log("Redis Client Error", err));

  master.on("connect", () => console.log("Connected to redis master."));
  master.on("error", (err) => console.log("Redis Client Error", err));

  await client.connect();
  await master.connect();
  
  await client.flushAll();
})();

async function hashExists(key: string) {
  return await client.exists(key);
}

async function setHashWithTimeout(key: string, timeout: number = 600) {
  master.set(key, "");
  master.expire(key, timeout);
}

export { setHashWithTimeout, hashExists, client };
