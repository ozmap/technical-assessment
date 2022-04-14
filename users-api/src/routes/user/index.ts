import express, { Request, Response } from "express";
import { createOrUpdateUser, fetchUsers } from "repositories/user";
import { Md5 } from "ts-md5/dist/md5";
import { setHashWithTimeout, hashExists } from "utils/requestTimeout";

const userRouter = express.Router();

userRouter.get("/", async function (req: Request, res: Response) {
  const users = await fetchUsers();
  if (users) {
    res.status(200).send(users);
    return;
  }
});

userRouter.post("/", async function (req: Request, res: Response) {
  // creates hash from request's body
  const bodyHash = Md5.hashStr(JSON.stringify(req.body));
  // check if hash exists in redis database already
  if (!(await hashExists(bodyHash))) {
    // sets a new key with a 10 minutes automatic timeout
    setHashWithTimeout(bodyHash);
    // upserts user
    const user = await createOrUpdateUser(req.body);
    res.status(201).send(user);
    return;
  }
  res.status(403).send({ msg: "Too many requests with same body." });
  return;
});

export default userRouter;
