import { createClient } from "redis";

const client = createClient();

(async () => {
  client.on("connect", () => console.log("Connected!"));
  client.on("error", (err) => console.log("Redis Client Error", err));

  await client.connect();
})();

async function hashExists(key: string) {
  return await client.exists(key);
}

async function setHashWithTimeout(key: string, timeout: number = 600) {
  client.set(key, "");
  client.expire(key, timeout);
}

export { setHashWithTimeout, hashExists, client };
