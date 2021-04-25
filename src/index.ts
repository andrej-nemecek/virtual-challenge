import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import helmet from 'helmet';

import { authenticateRequest } from './middlewares/auth';
import { mainRouter } from './routes/main';
import { challengesRouter } from './routes/challenges';
import { userRouter } from './routes/user';
import { hanndleErrors } from './middlewares/errors-handler';
import { orderRouter } from './routes/order';
import { adminRouter } from './routes/admin';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();
app.set('view engine', 'ejs');

app.use('/static', express.static('static'));
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'frame-src': ['https://www.google.com'],
        'img-src': ["'self'", 'https://res.cloudinary.com'],
      },
    },
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(authenticateRequest);

app.use('/vyzvy/', challengesRouter);
app.use('/ucet/', userRouter);
app.use('/objednavka/', orderRouter);
app.use('/admin/', adminRouter);
app.use(mainRouter);
app.use(hanndleErrors);

app.listen(process.env.PORT, () => {
  console.log(`App is running: ${process.env.URL}:${process.env.PORT}`);
});
