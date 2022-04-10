import { DataSource } from "typeorm";
import "reflect-metadata";

const dataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  database: "dragondb",
  username: "root",
  password: "root",
  dropSchema: true,
  synchronize: true,
  entities: ["src/models/**/*.ts"],
});

dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized successfully.");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

export default dataSource;
