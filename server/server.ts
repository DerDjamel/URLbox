import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import base from './routes/base.routes';

const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', base);

export default app;
