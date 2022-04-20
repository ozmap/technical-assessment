import request from "supertest";
import "reflect-metadata";
import app from "../app";
import { getConnection } from "typeorm";
import { Entity, Column, PrimaryColumn } from "typeorm";
import { client } from "utils/requestTimeout";

@Entity()
export class User {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;
}

beforeEach(async () => {
  await client.flushAll();
});

afterEach(async () => {
  let dbConn = await getConnection();
  await dbConn.synchronize(true);
});

describe("POST / ", () => {
  test("It should respond with the received body", async () => {
    const query = { id: "123", name: "Ada Lovelace" };
    const response = await request(app).post("/v1/users/").send(query);
    expect(response.body).toEqual(query);
    expect(response.statusCode).toBe(201);
  });
});

describe("POST / ", () => {
  test("It should respond with status 403 after sending the same body for the second time", async () => {
    const query = { id: "123", name: "Ada Lovelace" };
    const response = await request(app).post("/v1/users/").send(query);
    expect(response.body).toEqual(query);
    expect(response.statusCode).toBe(201);
    const secondResponse = await request(app).post("/v1/users/").send(query);
    expect(secondResponse.statusCode).toBe(403);
  });
});
