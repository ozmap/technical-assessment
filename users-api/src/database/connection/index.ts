import "reflect-metadata";
import { ConnectionOptions, Connection, createConnection } from "typeorm";

let connection: Connection | null = null;

export default async function getConnection(): Promise<Connection> {
  if (!connection) {
    connection = await createConnection({
      type: "mysql",
      host: process.env.DB_HOST || "localhost",
      database: "users-api-db",
      username: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "root",
      entities: ["src/models/**/*.ts"],
      synchronize: true,
      dropSchema: true,
    } as ConnectionOptions);
  }
  return connection;
}
