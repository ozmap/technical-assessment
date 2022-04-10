import express, { Request, Response } from "express";
import { createOrUpdateUser } from "repositories/user";
import { Md5 } from "ts-md5/dist/md5";
import { setHashWithTimeout, hashExists } from "utils/requestTimeout";

const userRouter = express.Router();

userRouter.post("/", async function (req: Request, res: Response) {
  const bodyHash = Md5.hashStr(JSON.stringify(req.body));
  if (!(await hashExists(bodyHash))) {
    setHashWithTimeout(bodyHash);
    const user = await createOrUpdateUser(req.body);
    res.status(201).send(user);
    return;
  }
  res.status(403).send({ msg: "Too many requests with same body." });
  return;
});

export default userRouter;
