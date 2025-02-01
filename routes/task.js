import { Router } from 'express';
import { handleAssignTask, handleGetAllTask } from '../controllers/task';

const taskRouter = Router();

taskRouter.post('/assign', handleAssignTask);
taskRouter.get('/:id', handleGetAllTask);

export { taskRouter };
