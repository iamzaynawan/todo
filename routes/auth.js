import { Router } from 'express';
import { handleGetLogin, handleGetRegister } from '../controllers/auth';

const userRouter = Router();

userRouter.post('/register', handleGetRegister);
userRouter.post('/login', handleGetLogin);

export { userRouter };
