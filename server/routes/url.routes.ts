import { Router } from 'express';
import urlController from '../controllers/url.controller';

const router = Router();

router.get('/:code', urlController.getShortUrlByCode);
router.post('/original', urlController.getShortUrlByOriginalUrl);
router.post('/', urlController.add);
export default router;
