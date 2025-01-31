import { userModel as User } from "../models/user.js";
import { taskModel as Task } from "../models/task.js";
import { handleError500 } from "../utils/utils.js";

const handleGetRegister = async (req, res) => {
    const { email, password } = req.body;
    try{
        await User.create({ email, password});
        res.status(201).json({ message: 'User registered successfully' });
    }catch (error) {
        res.status(500).json({ message: 'Error adding user', error });
    }
};

const handleGetLogin = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({ where: { email } });
        if (!user || password !== user.password) {
            return res.status(401).json({ message: 'User Not Found' });
        }
        res.status(200).json({ message: 'Login successful', user });
    }catch (error) {
        res.status(500).json({ message: 'Error during login', error });
    }
};

const handleAssignTask = async (req,res) => {
    const {userId, task} = req.body;
    try {
        await Task.create({userId, task});
        res.status(201).json({ message: 'Task Assigned Successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error in Assigning Task', error })
    }
};

const handleGetAllUser = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (error) {
        handleError500(res, error);
    }
};

const handleGetAllTask = async (req, res) => {
    const userId = req.params.id;
    try {
        const Tasks = await Task.findAll({ where: { userId } });
        if(Tasks !== null){
            return res.status(200).json(Tasks);
        }else{
            res.status(404).json({ message: 'No tasks found for this user' });
        }
    } catch (error) {
        handleError500(res, error);
    }
};

export {
    handleGetLogin,
    handleGetRegister,
    handleAssignTask,
    handleGetAllTask,
    handleGetAllUser,
};
