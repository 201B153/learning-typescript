import { NextFunction } from 'connect';
import express from 'express';
import todoRoutes from './routes/todos';

import { json } from 'body-parser';

const app = express();

app.use(json());

app.use('/todo', todoRoutes);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    res.status(500).json({ message: err.message });
  }
);

app.listen(3000);
