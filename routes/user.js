import { Router } from 'express';

import {handlerGetRegister,
        handlerGetLogin,
        handlerGetAllTask,
        handlerGetAllUser,
        handlerAssignTask,
    } from '../controllers/user.js';

const userRouter = async () => {
    userRouter.post('register', handlerGetRegister);
    userRouter.post('login', handlerGetLogin);
    userRouter.post('task/:userId', handlerAssignTask);
    userRouter.get('users', handlerGetAllUser);
    userRouter.get('task/:id', handlerGetAllTask);
};

export { userRouter };