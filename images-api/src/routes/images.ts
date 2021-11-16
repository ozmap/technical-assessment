import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/images/:img.png', (req: Request, res: Response) => {
  const imgId = parseInt(req.params.img);
  const modResult = imgId % 5;

  const [statusCode, message] = modResult === 0
    ? [404, 'There is no such image!']
    : [200, 'The image exists!'];

  res.status(statusCode).send({ message });
});

export { router as imagesRouter };
