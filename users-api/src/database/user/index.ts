import dataSource from "database/connection";
import { User } from "models/user";

export async function createOrUpdateUser(
  payload: Partial<User>
): Promise<User> {
  const userRepository = dataSource.getRepository(User);
  const user = new User();
  user.id = payload.id as string;
  user.name = payload.name as string;
  await userRepository.save(user);
  return user;
}
