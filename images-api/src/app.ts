import express from 'express';
import { json } from 'body-parser';

import { imagesRouter } from './routes/images';

const app = express();

app.set('trust proxy', true);
app.use(json());

app.use(imagesRouter);

export { app };
