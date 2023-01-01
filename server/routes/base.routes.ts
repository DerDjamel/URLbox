import { Router, Request, Response } from 'express';
import urlRouter from './url.routes';

const base = Router();

base.get('/', (req: Request, res: Response) => {
    return res.json({ message: 'app working' });
});

base.use('/url', urlRouter);

export default base;
