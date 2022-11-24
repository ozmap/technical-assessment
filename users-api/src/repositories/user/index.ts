import { User } from "models/user";
import * as database from "database/user";

export async function fetchUsers(): Promise<User[]> {
  return database.fetchUsers();
}

export async function createOrUpdateUser(user: Partial<User>): Promise<User> {
  return database.createOrUpdateUser(user);
}
