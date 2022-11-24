import express from "express";
import "utils/requestTimeout";

import userRouter from "routes/user";

const app = express();
app.use(express.json());

app.use("/v1/users", userRouter);

export default app;
