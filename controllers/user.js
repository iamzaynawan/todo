import { User } from '../connections/database.js';
import { Task } from '../connections/database.js';


const handlerGetRegister = async (req, res) => {
    const { email, password } = req.body;
    try{
        await User.create({ email, password});
        res.status(201).json({ message: 'User added successfully' });
    }catch (error) {
        res.status(500).json({ message: 'Error adding user', error });
    }
};

const handlerGetLogin = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({ where: { email } });
        if (!user || password !== user.password) {
            return res.status(500).json({ message: 'User Not Found' });
        }
        res.status(200).json({ message: 'Login successful', user });
    }catch (error) {
        res.status(500).json({ message: 'Error during login', error });
    }
};

const handlerAssignTask = (req,res) => {
    const userId = req.params.userId;
    const task = req.body;
    try {
        Task.create({userId, task});
        res.status(201).json({ message: 'Task Assigned Successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error in Assigning Task', error })
    }
};

const handlerGetAllUser = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

const handlerGetAllTask = async (req, res) => {
    const userId = req.params.id;
    try {
        const Tasks = await Task.findAll({ where: { userId } });
        if(Tasks !== null){
            return res.status(200).json(Tasks);
        }else{
            res.status(500).json('User has no tasks');
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Tasks', error });
    }
};

export {
    handlerGetLogin,
    handlerGetRegister,
    handlerAssignTask,
    handlerGetAllTask,
    handlerGetAllUser,
};
