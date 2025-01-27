import { Router } from 'express';

import {handleGetRegister,
        handleGetLogin,
        handleGetAllTask,
        handleGetAllUser,
        handleAssignTask,
    } from '../controllers/user.js';

const userRouter = Router();

userRouter.post('/register', handleGetRegister);
userRouter.post('/login', handleGetLogin);
userRouter.post('/task', handleAssignTask);
userRouter.get('/users', handleGetAllUser);
userRouter.get('/task/:id', handleGetAllTask);


export { userRouter };