import express from 'express';
import dataSource from "./database/connection";

const app = express();
app.use(express.json());
const port = 3000;

dataSource.initialize();


app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});