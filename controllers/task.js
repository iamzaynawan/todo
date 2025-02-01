import { taskModel as Task } from "../models/task.js";
import { sendResponse } from "../utils/utils.js";

const handleAssignTask = async (req,res) => {
    const {userId, task} = req.body;
    try {
        await Task.create({userId, task});
        sendResponse(res, 201, 'Task Assigned Successfully');
    } catch (error) {
        sendResponse(res, 500, 'Error in Assigning Task', error );
    }
};

const handleGetAllTask = async (req, res) => {
    const userId = req.params.id;
    try {
        const Tasks = await Task.findAll({ where: { userId } });
        if(Tasks !== null){
            sendResponse(res, 200, Tasks);
        }else{
            sendResponse(res, 404, 'No tasks found for this user');
        }
    } catch (error) {
        sendResponse(res, 500, error);
    }
};

export {
    handleAssignTask,
    handleGetAllTask
};
