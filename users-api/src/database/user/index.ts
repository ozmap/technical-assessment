import getConnection from "database/connection";
import { User } from "models/user";

export async function fetchUsers(): Promise<User[]> {
  const connection = await getConnection();
  const userRepository = connection.getRepository(User);
  return await userRepository.find({});
}

export async function createOrUpdateUser(
  payload: Partial<User>
): Promise<User> {
  const connection = await getConnection();
  const userRepository = connection.getRepository(User);
  const user = new User();
  user.id = payload.id as string;
  user.name = payload.name as string;
  await userRepository.save(user);
  return user;
}
