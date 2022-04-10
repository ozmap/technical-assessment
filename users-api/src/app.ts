import express from 'express';
import dataSource from "./database/connection";
import "utils/requestTimeout";

import userRouter from "./routes/user";

const app = express();
app.use(express.json());
const port = 3000;

dataSource.initialize();

app.use("/api/users", userRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});