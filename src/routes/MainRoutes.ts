import { Router } from 'express';
import * as chatController from '../controllers/chatController';

const router = Router();

router.get('/', chatController.index);

export default router;